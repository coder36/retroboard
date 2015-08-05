import Peer from 'peerjs'
import React from 'react'
import StickyStore from './stickystore'
import StickyActions from './stickyactions'


export default class WebRtcManager {

    constructor() {
        this.remoteConnections = [];
        this.setupPeer();
    }

    setupPeer() {
        this.peer = new Peer({key: 'lwjd5qra8257b9'});
        this.peer.on( 'open', ( (peer_id)  => {
            this.peer_id = peer_id;
            StickyActions.setPeerState( {id: this.peer_id, status: ""} )
        }));

        this.peer.on('connection', (remoteConnection) => {
            console.log("remote connection from " + remoteConnection.peer);
            this.remoteConnections.push(remoteConnection);

            remoteConnection.on('open', () => {
                StickyStore.getState().stickies.forEach( (sticky) => {
                    this.broadcast(sticky);
                });
                remoteConnection.on('data', (data) => {
                    this.receive(data);
                });
            });

        });
    }

    connectTo(remoteId) {
        let conn = this.peer.connect(remoteId);
        this.peer.on('error', (err => StickyActions.setPeerState( {id: this.peer_id, status: "failed"} ) ));
        conn.on('open', () => {
            StickyActions.setPeerState( {id: this.peer_id, status: "connected"});
            this.remoteConnections.push(conn);
            conn.on('data', (data) => {
                this.receive(data);
            });
        });
     };

    receive(data) {
        console.log(data);
        if( data.seen_by_peers.indexOf(this.peer_id ) == -1 ) {
            StickyActions.update(data);
        }
    }

    broadcast(data) {
        data.seen_by_peers = data.seen_by_peers || [];

        if ( data.seen_by_peers.indexOf(this.peer_id) == -1 ) {
            data.seen_by_peers.push(this.peer_id);
        }

        this.remoteConnections.forEach( (conn) => {
            if ( data.seen_by_peers.indexOf(conn.peer ) == -1 ) {
                conn.send(data);
            }
        });
    }

}
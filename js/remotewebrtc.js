import React from 'react'
import StickyActions from './stickyactions'
import 'adapterjs'
import connectToStores from 'alt/utils/connectToStores'
import linkState from './linkstate'
import URI from 'URIjs'

@linkState
export default class RemoteWebRtc extends React.Component {

    constructor(props) {
        super(props);
        this.state = {remote_id: ""};
        let uri = new URI(window.location.href).query(true);

        if( uri.remote ) {
            this.state = {remote_id: uri.remote};
            StickyActions.createRemoteConnection( uri.remote );
        }

    }

    connect() {
        StickyActions.createRemoteConnection( this.state.remote_id );
    }

    render()  {

        let status = this.props.status;
        let connected = status == "connected";
        let uri = new URI(window.location.href);
        return (
            <div>
                <div className="row">
                    <label for="remote_id">Remote Id:</label>
                    <input type="text" className="" id="remote_id" valueLink={this.linkState('remote_id')} disabled={connected}></input>
                    <button className="btn" onClick={() => this.connect()}>Connect</button>
                    <span>{this.props.status}</span>
                </div>
                <div className="peer_id">
                    <span>{uri.search("") + "?remote=" + this.props.peer_id}</span>
                </div>
                <div>

                </div>
            </div>
        );
    }
}



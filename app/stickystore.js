import alt from './alt';
import StickyActions from './stickyactions';
import WebRtcManager from './webrtcmanager';

var id=1;

class StickyStore {

    constructor() {
        this.bindActions(StickyActions);
        var data = { stickies: [], peerjs:{ id: "", status:""}};
        data.stickies.push( {id: id, x: 0, y: 300, z: 0, text: "Retroboard"} );
        id++;
        this.state = data;
        this.webRtcManager = new WebRtcManager();
    }

    update(sticky) {
        const stickies = this.state.stickies;
        var s = this.getSticky(sticky.id);
        if(!s) {
            s = {id: sticky.id};
            stickies.push(s);
        }
        s.x = sticky.x;
        s.y = sticky.y;
        s.z = sticky.z;
        s.text = sticky.text;
        this.setState({stickies});
        this.webRtcManager.broadcast(sticky);

    };

    create(sticky) {
        const stickies = this.state.stickies;
        let s = {};
        s.text = sticky.text;
        id++;
        s.id = id;
        s.x = 23;
        s.y = 23;
        s.z = 1;
        stickies.push(s);
        this.setState({stickies});
        this.webRtcManager.broadcast(s);
    }

    getSticky(id) {
        return this.state.stickies.filter( (sticky) => sticky.id === id )[0];
    }

    createRemoteConnection(remote_id) {
        this.setState( {peerjs: {id: "", status: "connecting"}} );
        this.webRtcManager.connectTo(remote_id);
    }

    setPeerState( peerjs ) {
        this.setState( {peerjs} );
    }
}

export default alt.createStore(StickyStore);



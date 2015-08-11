import alt from './alt';
import StickyActions from './stickyactions';
import WebRtcManager from './webrtcmanager';
import md5 from 'md5';

var zindex = 1;

class StickyStore {

    constructor() {
        this.bindActions(StickyActions);
        this.state = { stickies: [], peerjs:{ id: "", status:""}};
        this.state.stickies.push( StickyStore.createStickyData("Retroboard"));
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
        if ( sticky.z > zindex ) {
            zindex = sticky.z;
        }
        s.text = sticky.text;
        this.setState({stickies});
        this.webRtcManager.broadcast(sticky);

    };

    create(sticky) {
        const stickies = this.state.stickies;
        let s = StickyStore.createStickyData( sticky.text );
        console.log(s.id);
        stickies.push(s);
        this.setState({stickies});
        this.webRtcManager.broadcast(s);
    }

    delete(sticky) {
        const stickies = this.state.stickies;
        let index = stickies.map( s => s.id ).indexOf(sticky.id);
        stickies.splice(index, 1 );
        this.setState({stickies});
        sticky.action = "delete";
        this.webRtcManager.broadcast(sticky);
    }

    stickyToTop(sticky) {
        const stickies = this.state.stickies
        var s = this.getSticky(sticky.id);
        s.z = zindex++;
        this.setState({stickies});
        this.webRtcManager.broadcast(s);
    }

    static createStickyData(text) {
        let s = {};
        s.text = text;
        s.id = md5(text);
        s.x = 23;
        s.y = 23;
        s.z = zindex++;
        return s;
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



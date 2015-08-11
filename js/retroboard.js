import Sticky from './sticky'
import StickyStore from './stickystore'
import ControlPanel from './controlpanel'
import React from 'react'
import connectToStores from 'alt/utils/connectToStores'

@connectToStores
export default class Retroboard extends React.Component {

    static getStores() {
        return [StickyStore];
    }

    static getPropsFromStores() {
        return StickyStore.getState();
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <h1>Hello world</h1>
        )
    }

    render() {
        var stickies = this.props.stickies.map((sticky)=> {
            return (
                <Sticky data={sticky}></Sticky>
            )
        });

        return (
            <div className="retroboard">
                <div className="retro_ba"></div>
                <img width="100%" height="100%" src="img/got_1920x810.jpg"></img>
                <ControlPanel peerjs={this.props.peerjs}/>
                {stickies}
            </div>
        )
    }
}




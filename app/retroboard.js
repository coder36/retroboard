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
        var stickies = this.props.stickies.map((sticky)=> {
            return (
                <Sticky data={sticky}></Sticky>
            )
        });

        return (
            <div className="retroboard">
                <video width="100%" height="100%" controls loop autoplay muted>
                    <source src="//static.video.sky.com/skyatlantic/2015/06/131841/131841-576p_2000K_H264.mp4" type="video/mp4"/>
                </video>
                <ControlPanel peerjs={this.props.peerjs}/>
                {stickies}
            </div>
        )
    }
}




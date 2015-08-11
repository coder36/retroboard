import React from 'react';
import RemoteWebRtc from './remotewebrtc';
import NewSticky from './newsticky'

export default class ControlPanel extends React.Component {

    render() {
        return(
            <div className="sky-form">
              <RemoteWebRtc status={this.props.peerjs.status} peer_id={this.props.peerjs.id} />
              <NewSticky/>
          </div>
        );
    }


}
import React from 'react'
import StickyActions from './stickyactions'
import 'adapterjs'
import connectToStores from 'alt/utils/connectToStores'
import linkState from './linkstate'

@linkState
export default class RemoteWebRtc extends React.Component {

    constructor(props) {
        super(props);
        this.state= {remote_id: ""}
    }

    connect() {
        StickyActions.createRemoteConnection( this.state.remote_id );
    }

    render()  {
        return (
            <div>
                <div className="row">
                    <label for="remote_id">Remote Id:</label>
                    <input type="text" className="" id="remote_id" valueLink={this.linkState('remote_id')}></input>
                    <button className="btn" onClick={() => this.connect()}>Connect</button>
                    <span>{this.props.status}</span>
                </div>
                <div className="peer_id">
                    <span>{this.props.peer_id}</span>
                </div>
                <div>

                </div>
            </div>
        );
    }
}



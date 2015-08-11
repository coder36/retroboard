import React from 'react'
import StickyActions from './stickyactions';
import linkState from './linkstate'

@linkState
export default class NewSticky extends React.Component {

    constructor(props) {
        super(props);
        this.state = { sticky_text: ""}
    }

    create() {
        let s = {};
        s.text = this.state.sticky_text;
        StickyActions.create(s);
    }

    render() {
        return (
            <div className="row">
                <label for="new_sticky">New Sticky:</label>
                <input type="text" className="form-control" id="new_sticky" valueLink={this.linkState('sticky_text')}></input>
                <button className="btn" onClick={() => this.create()}>Create</button>
            </div>
        );
    }


}
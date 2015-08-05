import React from 'react'
import StickyActions from './stickyactions'
import Rx from 'rx'


export default class Sticky extends React.Component {

    constructor(props) {
        super(props);
    }

    dragSticky(mousePosition) {
        var startX = this.props.data.x;
        var startY = this.props.data.y;
        Rx.Observable.fromEvent(document, 'mousemove').map((moveEvent) => {
            moveEvent.preventDefault();
            return {
                x: moveEvent.clientX - (mousePosition.x - startX),
                y: moveEvent.clientY - (mousePosition.y - startY)
            }
        }).takeUntil(Rx.Observable.fromEvent(document, 'mouseup'))
            .forEach((newPos) => {
                var data = this.props.data;
                data.x = newPos.x;
                data.y = newPos.y;
                StickyActions.update(data);
            });
    };

    mousedown(event) {
        this.dragSticky({x: event.clientX, y: event.clientY});
    };

    render() {
        var data = this.props.data;
        return (
            <div onMouseDown={(e) => this.mousedown(e)} className="sticky" style={{zIndex: data.z, left: data.x, top: data.y}}>
                <div className="note noselect">
                    <div className="note noselect">
                        {data.text}
                    </div>
                </div>

            </div>
        );
    }

}
import React from 'react'
import StickyActions from './stickyactions'
import Rx from 'rx'


export default class Sticky extends React.Component {

    constructor(props) {
        super(props);
    }

    dragSticky(mousePosition) {
        StickyActions.stickyToTop(this.props.data);

        var startX = this.props.data.x;
        var startY = this.props.data.y;

        var mouseMove = Rx.Observable.merge(
            Rx.Observable.fromEvent(document, 'mousemove'),
            Rx.Observable.fromEvent(document, 'touchmove').map((event) => {
                event.preventDefault();
                let touch = event.touches[0];
                return ({
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
            }));

        var mouseUp = Rx.Observable.merge(
            Rx.Observable.fromEvent(document, 'mouseup'),
            Rx.Observable.fromEvent(document, 'touchend'));


        mouseMove.map((moveEvent) => {
            //moveEvent.preventDefault();
            return {
                x: moveEvent.clientX - (mousePosition.x - startX),
                y: moveEvent.clientY - (mousePosition.y - startY)
            }
        }).takeUntil(mouseUp)
            .forEach((newPos) => {
                //console.log(newPos)
                var data = this.props.data;
                data.x = newPos.x;
                data.y = newPos.y;
                StickyActions.update(data);
            });
    };
    
    onMouseDown(event) {
        this.dragSticky({x: event.clientX, y: event.clientY});
    }

    onTouchStart(event) {
        let touch = event.touches[0];
        this.dragSticky({x: touch.clientX, y: touch.clientY});
    };

    onDelete() {
        StickyActions.delete(this.props.data);
    }

    render() {
        var data = this.props.data;
        return (
            <div onTouchStart={(e) => this.onTouchStart(e)} onMouseDown={(e) => this.onMouseDown(e)} className="sticky" style={{zIndex: data.z, left: data.x, top: data.y}}>
                <div className="close_icon" onClick={()=>this.onDelete()}></div>
                <div className="note noselect">
                    <div className="note noselect">
                        {data.text}
                    </div>
                </div>

            </div>
        );
    }

}
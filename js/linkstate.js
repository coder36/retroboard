export default function linkState(target) {
    target.prototype.linkState = function(key) {
        return ({
            value: this.state[key],
            requestChange: (newValue) => {
                var state = this.state;
                state[key] = newValue;
                this.setState(state);
            }
        });
    }
}
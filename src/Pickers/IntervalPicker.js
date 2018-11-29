import React, {Component} from 'react';

class IntervalPicker extends Component {
    constructor(props) {
        super(props);

        this.interval = this.props.interval;

        this.state = {
            seconds: 0,
            minutes: 0,
            hours: 0,
            days: 0
        };
    }

    render() {
        return (
            <div>
                <div>
                    <label>Days</label>
                    <input type="text" value={this.state.days} onChange={this.dayChanged.bind(this)}/>
                </div>
                <div>
                    <label>Hours</label>
                    <input type="text" value={this.state.hours} onChange={this.hoursChanged.bind(this)}/>
                </div>
                <div>
                    <label>Minutes</label>
                    <input type="text" value={this.state.minutes} onChange={this.minutesChanged.bind(this)}/>
                </div>
                <div>
                    <label>Seconds</label>
                    <input type="text" value={this.state.seconds} onChange={this.secondsChanged.bind(this)}/>
                </div>
            </div>
        );
    }

    dayChanged(event) {
        let day = event.target.value;

        this.setState({
            days: day
        });

        this.updateDate();
    }

    hoursChanged(event) {
        let hour = event.target.value;

        this.setState({
            hours: hour
        });

        this.updateDate();
    }

    minutesChanged(event) {
        let minute = event.target.value;

        this.setState({
            minutes: minute
        });

        this.updateDate();
    }

    secondsChanged(event) {
        let second = event.target.value;

        this.setState({
            seconds: second
        });

        this.updateDate();
    }

    updateDate() {
        let newInterval = 0;

        if (this.state.days) {
            newInterval += (this.state.days * 24 * 60 * 60 * 1000);
        }

        if (this.state.hours) {
            newInterval += (this.state.hours * 60 * 60 * 1000);
        }

        if (this.state.minutes) {
            newInterval += (this.state.minutes * 60 * 1000);
        }

        if (this.state.seconds) {
            newInterval += (this.state.seconds * 1000);
        }

        this.interval = newInterval;
    }
}

export default IntervalPicker;
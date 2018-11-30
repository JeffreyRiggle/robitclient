import React, {Component} from 'react';
import IntervalPicker from './Pickers/IntervalPicker';

const daily = 'Daily';
const futureTime = 'FutureTime';
const reoccuring = 'Reoccuring';

class Deferred extends Component {
    constructor(props) {
        super(props);

        this.action = this.props.action;

        this.state = {
            selectedType: futureTime,
            action: this.action.action
        }
    }

    render() {
        return (
            <div>
                <h3>Deferred Action</h3>
                <select value={this.state.selectedType} onChange={this.typeChanged.bind(this)}>
                    <option value={futureTime}>Future Time</option>
                    <option value={daily}>Daily</option>
                    <option value={reoccuring}>Re-Occuring</option>
                </select>
                {this.renderTimePicker()}
            </div>
        );
    }

    renderTimePicker() {
        if (this.state.selectedType === daily) {
            return <div>Daily</div>
        }

        if (this.state.selectedType === futureTime) {
            return <div>Future</div>
        }

        return <IntervalPicker interval={this.action.reoccuring} onChange={this.updateInterval.bind(this)}/>
    }

    updateInterval(interval) {
        this.action.reoccuring = interval;
    }

    typeChanged(event) {
        let newType = event.target.value;

        if (newType === this.state.selectedType) {
            return;
        }

        this.updateType(newType);
        this.setState({
            selectedType: newType
        });
    }

    updateType(newType) {
        delete this.action.timestamp;
        delete this.action.daily;
        delete this.action.reoccuring;

        if (newType === daily) {
            this.action.daily = '';
            return;
        }

        if (newType === futureTime) {
            this.action.timestamp = ''
            return;
        }

        this.action.reoccuring = '';
    }
}

export default Deferred;
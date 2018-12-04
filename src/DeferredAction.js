import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import IntervalPicker from './Pickers/IntervalPicker';
import DailyPicker from './Pickers/DailyPicker';
import FuturePicker from './Pickers/FuturePicker';
import moment from 'moment';

const daily = 'Daily';
const futureTime = 'FutureTime';
const reoccuring = 'Reoccuring';

class Deferred extends Component {
    constructor(props) {
        super(props);

        this.action = this.props.action;

        this.state = {
            selectedType: this.determineSelectedType(),
            action: this.action.action
        }
    }

    determineSelectedType() {
        if (this.action.daily) {
            return daily;
        }

        if (this.action.reoccuring) {
            return reoccuring;
        }

        return futureTime;
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
                <Link to={`/deferred/action/${this.action.id}`}>Action</Link>
            </div>
        );
    }

    renderTimePicker() {
        if (this.state.selectedType === daily) {
            return <DailyPicker time={this.action.daily} onChange={this.updateDaily.bind(this)}/>
        }

        if (this.state.selectedType === futureTime) {
            return <FuturePicker date={this.action.timestamp} onChange={this.updateTimeStamp.bind(this)}/>
        }

        return <IntervalPicker interval={this.action.reoccuring} onChange={this.updateInterval.bind(this)}/>
    }

    updateDaily(value) {
        this.action.daily = value;
    }

    updateInterval(interval) {
        this.action.reoccuring = interval;
    }

    updateTimeStamp(timestamp) {
        this.action.timestamp = timestamp;
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
            this.action.daily = moment().format('HH:mm:ss');
            return;
        }

        if (newType === futureTime) {
            this.action.timestamp = ''
            return;
        }

        this.action.reoccuring = 0;
    }
}

export default Deferred;
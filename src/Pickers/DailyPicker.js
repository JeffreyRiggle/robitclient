import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class DailyPicker extends Component {
    constructor(props) {
        super(props);

        let date;

        if (this.props.time) {
            date = moment(this.props.time, 'HH:mm:ss').toDate();
        } else {
            date = new Date();
        }

        this.state = {
            date: date
        }
    }

    render() {
        return (
            <DatePicker 
                selected={this.state.date} 
                onChange={this.dateChanged.bind(this)} 
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={5}
                dateFormat="h:mm:ss aa"/>
        );
    }

    dateChanged(event) {
        let date = event;

        this.setState({
            date: date
        });
    }

    componentDidUpdate() {
        let nDate = moment(this.state.date).format('HH:mm:ss');

        if (this.props.onChange) {
            this.props.onChange(nDate);
        }
    }
}

export default DailyPicker
import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class FuturePicker extends Component {
    constructor(props) {
        super(props);

        let date;

        if (this.props.date) {
            date = moment(this.props.date).toDate();
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
                dateFormat="MMMM d, yyyy h:mm aa"
                timeIntervals={5} />
        );
    }

    dateChanged(event) {
        let date = event;

        this.setState({
            date: date
        });
    }

    componentDidUpdate() {
        let nDate = moment(this.state.date).format();

        if (this.props.onChange) {
            this.props.onChange(nDate);
        }
    }
}

export default FuturePicker;
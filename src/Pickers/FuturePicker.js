import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Help from '../Help/Help';
import getHelp from '../Help/helpProvider';
import './FuturePicker.scss';

import 'react-datepicker/dist/react-datepicker.css';

const futureHelp = getHelp('futureHelp');

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
            <div className="future-picker">
                <DatePicker 
                    selected={this.state.date} 
                    onChange={this.dateChanged.bind(this)} 
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeIntervals={5} />
                <Help message={futureHelp} />
            </div>
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
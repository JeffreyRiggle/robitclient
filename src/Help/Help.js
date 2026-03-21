import {Component} from 'react';
import { Tooltip } from 'react-tooltip';

import './Help.scss';

class Help extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hover: false,
            helpText: this.props.message || 'No help provided'
        }
    }

    render() {
        return (
            <div className="help">
                <div data-tooltip-id="help-tooltip" data-tooltip-content={this.state.helpText} className="button">?</div>
                <Tooltip id="help-tooltip" effect="solid"/>
            </div>
        )
    }
}

export default Help;
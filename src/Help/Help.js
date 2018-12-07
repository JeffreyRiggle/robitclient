import React, {Component} from 'react';
import ReactTooltip from 'react-tooltip';

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
                <div data-tip={this.state.helpText} className="button">?</div>
                <ReactTooltip effect="solid"/>
            </div>
        )
    }
}

export default Help;
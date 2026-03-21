import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {getActionById, getActionFromDeferredId} from './configManager';
import BroadcastAction from './Actions/BroadcastAction';
import RandomBroadcastAction from './Actions/RandomBroadcastAction';
import EmbedAction from './Actions/EmbedAction';
import HttpAction from './Actions/HttpAction';
import MultiAction from './Actions/MultiAction';
import {
    sanitizeBroadcast, 
    sanitizeRandomBroadcast, 
    sanitizeEmbed,
    sanitizeHttp,
    sanitizeMulti 
} from './Actions/actionSanitizer';
import { useParams } from "react-router-dom";

import './Action.scss';

class Action extends Component {
  constructor(props) {
    super(props);

    this.backLocation = '/actions';
    let action = this.getAction(this.props.params);

    this.action = action;

    this.state = {
      selectedType: action?.type ?? 'broadcast',
      id: props.params?.id ?? props.params?.deferredid ?? 'unknown',
      message: action?.message,
      channelId: action?.channel
    };
  }

  getAction(params) {
    if (!params?.id && !params?.deferredid) {
        return;
    }

    if (params?.deferredid) {
        this.backLocation = '/deferredActions';
        return getActionFromDeferredId(params.deferredid);
    }

    if (!params?.rootid) {
        return getActionById(params.id);
    }

    let root = getActionById(params?.rootid);
    this.backLocation = `/actions/${root.id}`;

    return root.action.actions.find(act => act.id === params.id);
  }

  render() {
    if (!this.action) {
        return (
            <div>
                <h3>Something went wrong action {this.state.id} was not found :(</h3>
            </div>
        )
    }

    return (
      <div className="content-view">
        <h4><Link className="button" to={this.backLocation}>Back</Link></h4>
        <h3>Action {this.state.id}</h3>
        <div className="action-selection">
          <label className="action-selection-label">Type</label>
          <select value={this.state.selectedType} onChange={this.typeChanged.bind(this)}>
            <option value="broadcast">Broadcast</option>
            <option value="randombroadcast">Random Broadcast</option>
            <option value="embed">Embed</option>
            <option value="http">Http</option>
            <option value="multiaction">Multi-Action</option>
          </select>
        </div>
        {this.renderTypedAction()}
      </div>
    );
  }

  renderTypedAction() {
      if (this.state.selectedType === 'broadcast') {
          sanitizeBroadcast(this.action);
          return <BroadcastAction action={this.action} />
      }

      if (this.state.selectedType === 'randombroadcast') {
          sanitizeRandomBroadcast(this.action);
          return <RandomBroadcastAction action={this.action} />
      }

      if (this.state.selectedType === 'embed') {
          sanitizeEmbed(this.action);
          return <EmbedAction action={this.action} />
      }

      if (this.state.selectedType === 'http') {
          sanitizeHttp(this.action);
          return <HttpAction action={this.action} />
      }

      if (this.state.selectedType === 'multiaction') {
          sanitizeMulti(this.action);
          return <MultiAction action={this.action} />
      }

      return <div>Something went wrong, cant render type {this.state.selectedType}</div>
  }

  typeChanged(event) {
      let newType = event.target.value;

      this.action.type = newType;
      this.setState({
          selectedType: newType
      });
  }
}


const ParamsAction = (props) => (
    <Action
        {...props}
        params={useParams()}
    />
);

export default ParamsAction;
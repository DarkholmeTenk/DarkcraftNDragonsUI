import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import MonsterDetails from './MonsterDetails.js';
import API from '../api/API.js'
const api = new API();

class MonsterInfo extends Component {
    constructor() {
        super();
        this.state = {}
    }

    onChange() {
        if(!this.state.data)
        {
            api.requestMonsterData(this.props.name)
                .then(d=>this.setState({data:d}))
        }
    }

    render() {
        return <ExpansionPanel onChange={()=>this.onChange()}>
                <ExpansionPanelSummary>{this.props.name}{this.props.summaryInfo}</ExpansionPanelSummary>
                <ExpansionPanelDetails><MonsterDetails data={this.state.data} /></ExpansionPanelDetails>
            </ExpansionPanel>
    }
}

export default MonsterInfo
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import MonsterDetails from './MonsterDetails.js';
import API from '../api/API.js'
import { Typography } from '@material-ui/core';
const api = new API();

const style = theme => ({
    header:{
        display:'flex'
    },
    title:{
        flexGrow:'1'
    },
    second:{

    }
})

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
        let c = this.props.classes
        return <ExpansionPanel onChange={()=>this.onChange()}>
                <ExpansionPanelSummary className={c.header} expandIcon='v'>
                    <Typography variant='title' className={c.title}>{this.props.name}</Typography>
                    <Typography variant='subheading' className={c.second}>{this.props.summaryInfo}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails><MonsterDetails data={this.state.data} /></ExpansionPanelDetails>
            </ExpansionPanel>
    }
}

export default withStyles(style)(MonsterInfo)
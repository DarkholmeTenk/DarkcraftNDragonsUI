import React, { Component } from 'react' 
import { withStyles } from '@material-ui/core/styles';
import { Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, TextField } from '@material-ui/core';
import MonsterDetails from '../monster/MonsterDetails';
import Field from '../helper/Field';
import API from '../api/API'

import health from '../icons/health-normal.svg'
import d20 from '../icons/d20.svg'
import Ability from '../helper/Ability';

const style = theme=>({
    root:{
        display:'inline-flex',
        width:'100%'
    },
    summary:{
        alignItems:'center',
        flexWrap:'wrap'
    },
    summaryContents:{
        display:'inline-flex',
        flexWrap:'wrap',
        flexDirection:'row'
    },
    title:{
        textAlign:'left',
        width:'300px'
    },
    fieldHolder:{
        paddingLeft:'10px',
        paddingRight:'10px',
    },
    field:{
        width:'50px'
    },
    dead:{
        backgroundColor:'#ffaaaa',
    },
    turn:{
        backgroundColor:'#ffffaa',
    }
})

const api = new API()

class CombatQuickSheet extends Component {
    constructor(){
        super()
        this.state = {}
    }

    componentDidMount(){
        this.refresh()
    }

    getDetails() {
        const d = this.props.data

        let x = null
        if(d.type == "MONSTER" && this.state.data)
            x = <MonsterDetails data={this.state.data} />

        if(x)
            return <ExpansionPanelDetails>
                    {x}
                </ExpansionPanelDetails>
    }

    refresh() {
        const d = this.props.data
        api.requestSheet(d.type, d.id)
            .then((data)=>{
                this.setState({data:data})
            })
    }

    onHpChange(newHP) {
        let nHP = parseInt(newHP)
        let max = 1000000
        if(this.state.data)
            max = this.state.data.maxHP
        nHP = Math.max(0, Math.min(nHP, max))
        this.props.onChange('hp', nHP)
    }

    getHPField() {
        let f = <TextField
            id='hp'
            className={this.props.classes.field}
            value={this.props.data.hp}
            onChange={(e)=>this.onHpChange(e.target.value)}
            type='number'/>
        if(this.state.data)
            return <div>{f}/{this.state.data.maxHP}</div>
        else
            return <div>{f}</div>
    }

    onInitiativeChange(newInitiative) {
        let nI = parseInt(newInitiative)
        if(newInitiative == "" || nI < 1 || nI > 20)
            nI = -1;
        else
        {
            console.log(this.state.data.dexterity)
            // nI += Ability.getMod(this.state.data.abilities.dex)
        }
        console.log(nI)
        this.props.onChange('initiative', nI)
    }

    getInitiativeField() {
        let x = this.props.data.initiative
        if(x == -1)
            x = ""
        return <TextField
            id = 'initiative'
            className={this.props.classes.field}
            value={x}
            onChange={(e)=>this.onInitiativeChange(e.target.value)}
            type='number'/>
    }

    getNoteNameField() {
        return <TextField
            id='quickName'
            label='Notes'
            value={this.props.data.quickName}
            onChange={(e)=>this.props.onChange('quickName',e.target.value)}
        />
    }

    render(){
        const d = this.props.data
        const c = this.props.classes

        let dead = this.props.data.hp==0
        return <ExpansionPanel expanded={this.props.isTurn && !dead} className={dead?c.dead:this.props.isTurn?c.turn:""}>
            <ExpansionPanelSummary classes={{content:c.summary}} onClick={e=>e.stopPropagation()}>
                <Typography className={c.title}>{d.sheetName}</Typography>
                <Field classes={{div:c.fieldHolder}} image={health} desc="Current Health" value={this.getHPField()} />
                <Field classes={{div:c.fieldHolder}} image={d20} desc="Initiative" value={this.getInitiativeField()} />
                {this.getNoteNameField()}
            </ExpansionPanelSummary>
            {this.getDetails()}
        </ExpansionPanel>
    }
}

const ProduceDefaultData = function(realSheet) {
    return {
        type:realSheet.sheetType,
        id:realSheet.id,
        hp:realSheet.maxHP,
        quickName:"",
        sheetName:realSheet.name,
        notes:"",
        initiative:-1
    }
}

export default withStyles(style)(CombatQuickSheet)
export { ProduceDefaultData }
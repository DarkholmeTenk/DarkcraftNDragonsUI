import React, { Component } from 'react' 
import { withStyles } from '@material-ui/core/styles';
import { Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, TextField, IconButton } from '@material-ui/core';
import MonsterDetails from '../monster/MonsterDetails';
import Field from '../helper/Field';
import API from '../api/API'

import health from '../icons/health-normal.svg'
import d20 from '../icons/d20.svg'
import PlayerSheet from '../pc/PlayerSheet';

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
    },
    note:{
        flexGrow:'1'
    },
    magic:{
        paddingRight:'0px !important'
    }
})

const api = new API()

class CombatQuickSheet extends Component {
    constructor(props){
        super()
        this.state = {data:props.data,
            hp:props.data.hp,
            initiative:props.data.initiative,
            quickName:props.data.quickName
        }
    }

    getDetails() {
        const d = this.state.data

        let x = null
        if(d.type === "MONSTER" && this.state.realSheet)
            x = <MonsterDetails data={this.state.realSheet} />
        if(d.type === "QUICK" && this.state.realSheet)
            x = <PlayerSheet data={this.state.realSheet} />

        if(x)
            return <ExpansionPanelDetails>
                    {x}
                </ExpansionPanelDetails>
    }

    onHpChange(newHP) {
        let nHP = parseInt(newHP, 10)
        let max = 1000000
        if(this.state.realSheet)
            max = this.state.realSheet.maxHP
        nHP = Math.max(0, Math.min(nHP, max))
        this.setState({"hp":nHP})
        this.props.onChange('hp', nHP)
    }

    getHPField() {
        let f = <TextField
            id='hp'
            className={this.props.classes.field}
            value={this.state.hp}
            onChange={(e)=>this.onHpChange(e.target.value)}
            type='number'/>
        if(this.state.realSheet)
            return <div>{f}/{this.state.realSheet.maxHP}</div>
        else
            return <div>{f}</div>
    }

    onInitiativeChange(newInitiative) {
        let nI = parseInt(newInitiative, 10)
        if(newInitiative === "")
            nI = -1;

        this.setState({initiative:nI})
        this.props.onChange('initiative', nI)
    }

    getInitiativeField() {
        let x = this.state.initiative
        if(x === -1)
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
            className={this.props.classes.note}
            id='quickName'
            label='Notes'
            value={this.state.quickName}
            onChange={(e)=>{
                let nV = e.target.value
                this.setState({quickName:nV})
                this.props.onChange('quickName',nV)
            }}
        />
    }

    isOpen()
    {
        if(this.props.isTurn && this.state.hp!==0)
        {
            let d = this.state.data
            if(!this.state.realSheet)
                api.requestSheet(d.type, d.id)
                    .then((data)=>{
                        console.log(d.type, d.id)
                        this.setState({realSheet:data})
                    })
            return true;
        }
        return false;
    }

    render(){
        const d = this.state.data
        const c = this.props.classes

        let dead = this.state.hp===0
        return <ExpansionPanel expanded={this.isOpen()} className={dead?c.dead:this.props.isTurn?c.turn:""}>
            <ExpansionPanelSummary classes={{content:c.summary}} onClick={e=>e.stopPropagation()}>
                <Typography className={c.title}>{d.sheetName}</Typography>
                <Field classes={{div:c.fieldHolder}} image={health} desc="Current Health" value={this.getHPField()} />
                <Field classes={{div:c.fieldHolder}} image={d20} desc="Initiative" value={this.getInitiativeField()} />
                {this.getNoteNameField()}
                <IconButton className={c.magic} onClick={()=>this.props.onRemove()} ><i className='material-icons'>delete</i></IconButton>
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
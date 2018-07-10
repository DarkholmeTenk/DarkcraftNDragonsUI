import React, {Component} from 'react'
import { withStyles, Paper, TextField, Typography, Snackbar } from '@material-ui/core';
import API from '../api/API';
import { Route, Switch } from 'react-router-dom'
import PlayerList from './PlayerList';
import PlayerSheet from './PlayerSheet';
import MoveSheet from '../helper/MoveSheet';
import StatSheet from '../helper/StatSheet';
import Field from '../helper/Field';

import ac from '../icons/breastplate.svg'
import hp from '../icons/health-normal.svg'
import pp from '../icons/eyeball.svg'

const api = new API()

const style = theme=>({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width:'100%'
    },
    div:{
        display: 'flex',
        flexDirection:'row',
        justifyContent:'space-evenly',
        flexWrap:'wrap',
        width:'100%'
    },
    regular:{
        flexGrow:1,
        padding:'8px',
        margin:'8px'
    },
})

class PlayerSheetPage extends Component {
    constructor(props) {
        super(props)
        this.id = props.match.params.id
        this.state = {
            showSaveSnackbar: false
        }
    }

    componentWillMount() {
        api.requestSheet("QUICK",this.id)
            .then(d=>this.setState({sheet:d}))
    }

    saveSheet(ns) {
        this.setState({sheet:ns});
        if(this.saveTimeout)
            clearTimeout(this.saveTimeout)
        this.saveTimeout = setTimeout(()=>{
            api.saveQuickSheet(ns)
            this.setState({showSaveSnackbar: true})
            setTimeout(()=>this.setState({showSaveSnackbar:false}), 1000)
        }, 3000)
    }

    changeField(field, value, isNum)
    {
        if(isNum && value%1!==0)
            return;
        let ns = JSON.parse(JSON.stringify(this.state.sheet))
        ns[field] = value;
        this.saveSheet(ns)
    }

    changeNestedField(x, type, value)
    {
        let ns = JSON.parse(JSON.stringify(this.state.sheet))
        if(!ns[x])
            ns[x] = {}
        ns[x][type]=value
        this.saveSheet(ns)
    }

    changeSpeed(type, value) {
        this.changeNestedField("speed", type, value)
    }

    changeAbility(type, value) {
        if(value %1 === 0)
            this.changeNestedField("abilities", type, value)
    }

    changeSavingThrow(type, value) {
        if(value %1 === 0)
            this.changeNestedField("savingThrows", type, value)
    }

    render() {
        const c = this.props.classes
        if(this.state.sheet)
        {
            const s = this.state.sheet
            return <div className={c.root} >
                <Typography variant='title'>{s.name}</Typography>
                <div className={c.div}>
                    <Field classes={{div:c.regular}}image={hp} desc="Max HP" value={<TextField value={s.maxHP} onChange={e=>this.changeField("maxHP",e.target.value,true)}/>}/>
                    <Field classes={{div:c.regular}} image={ac} desc="Armor Class" value={<TextField value={s.ac} onChange={e=>this.changeField("ac",e.target.value,true)}/>}/>
                    <Field classes={{div:c.regular}} image={pp} desc="Passive Perception" value={<TextField value={s.pp} onChange={e=>this.changeField("pp",e.target.value,true)}/>}/>
                    <Paper className={c.regular}>
                        <StatSheet data={s.abilities || {}} saves={s.savingThrows || {}} onChange={(e,v)=>this.changeAbility(e,v)} onChangeSave={(e,v)=>this.changeSavingThrow(e,v)}/>
                    </Paper>
                    <Paper className={c.regular}>
                        <MoveSheet onChange={(t,s)=>this.changeSpeed(t,s)} data={s.speed} />
                    </Paper>
                </div>
                <Snackbar
                    open={this.state.showSaveSnackbar}
                    onClose={()=>this.setState({showSaveSnackbar:false})}
                    message={<span id="message-id">Saved</span>}
                    />
            </div>
        }
        return "HI"
    }
}

export default withStyles(style)(PlayerSheetPage)
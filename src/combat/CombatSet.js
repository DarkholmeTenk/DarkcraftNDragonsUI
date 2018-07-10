import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import API from '../api/API';
import CombatQuickSheet, {ProduceDefaultData} from './CombatQuickSheet';
import { Typography, Hidden, Drawer, IconButton, Tooltip, Button, Snackbar } from '@material-ui/core';
import SheetDrawer from './SheetDrawer';
import Field from '../helper/Field';

import dice from '../icons/d20.svg'
import Ability from '../helper/Ability';
import DiceHelper from '../helper/DiceHelper';

const style = theme=>({
    root: {},
    drawer:{
        minWidth:'20%',
        maxWidth:'75%'
    },
    permDrawer:{
        width:'40%',
    }
})

const api = new API()

class CombatSet extends Component {
    constructor() {
        super();
        this.saveTime = null
    }

    componentDidMount() {
        this.refresh()
    }
    
    refresh() {
        let id = this.props.match.params.combatID
        return api.requestCombatSet(id)
            .then(l=>{console.log(l); return l;})
            .then((data)=>this.setState({data:data}))
    }

    save(set) {
        if(this.saveTime)
            clearTimeout(this.saveTime)
        this.setState({data:set})
        this.saveTime = setTimeout(()=>{
            api.saveCombatSet(set)
            this.setState({showSaveSnackbar: true})
            setTimeout(()=>this.setState({showSaveSnackbar:false}), 1000)
        },2000)
    }

    sort() {
        let d = JSON.parse(JSON.stringify(this.state.data))
        d.actors.sort((a,b)=>{
            if(a.initiative > b.initiative)
                return -1;
            if(a.initiative < b.initiative)
                return 1;
            return 0;
        })
        this.save(d)
    }

    addActor(type, id) {
        return api.requestSheet(type, id)
            .then(sheet=>{
                let d = JSON.parse(JSON.stringify(this.state.data))
                d.actors.push(ProduceDefaultData(sheet))
                return this.save(d)
            })
    }

    changeActor(i, field, val) {
        let d = JSON.parse(JSON.stringify(this.state.data))
        d.actors[i][field] = val;
        return this.save(d)
    }

    handleDrawerToggle(){
        this.setState({mobileOpen:!this.state.mobileOpen})
    }

    nextTurn() {
        let d = JSON.parse(JSON.stringify(this.state.data))
        let t = d.turn
        for(var i = 1; i <= d.actors.length; i++)
        {
            let newVal = t+i
            let a = d.actors[newVal % d.actors.length]
            if(a.hp > 0)
            {
                t = newVal;
                break;
            }
        }
        d.turn = t % d.actors.length
        this.save(d)
    }

    remove(k) {
        let d = JSON.parse(JSON.stringify(this.state.data))
        d.actors.splice(k,1)
        return this.save(d)
    }

    rollInitiative() {
        let monsters = {}
        console.log(this.state.data.actors)
        this.state.data.actors
            .filter(i=>i.type === "MONSTER")
            .map(i=>i.id)
            .forEach(i=>monsters[i]=true)
        Promise.all(Object.keys(monsters)
            .map(m=>api.requestSheet("MONSTER", m)))
            .then(m=>{
                let monsters = {}
                m.forEach(d=>d.initiative = Ability.getMod(d.abilities.dex))
                m.forEach(d=>monsters[d.id] = d.initiative + DiceHelper.rollD20())
                console.log(m, monsters)
                let ns = JSON.parse(JSON.stringify(this.state.data))
                ns.actors
                    .filter(i=>i.type === "MONSTER")
                    .forEach(i=>i.initiative = monsters[i.id] || 10)
                api.saveCombatSet(ns)
                    .then(()=>window.location.reload())
            })
    }

    render() {
        let c = this.props.classes
        if(this.state && this.state.data)
        {
            let drawer = <SheetDrawer onAdd={(t,i)=>this.addActor(t,i)}/>
            let d = this.state.data
            let t = (d.turn % d.actors.length)
            return <div>
                <main className={c.root}>
                    <Typography variant='title'>
                        Combat [{d.name}]
                        <IconButton onClick={()=>this.rollInitiative()}><Field image={dice} desc="Roll Initiative" /></IconButton>
                        <Button onClick={()=>this.nextTurn()}>Next Turn</Button>
                        <Button onClick={()=>this.sort()}>Sort</Button>
                        <Tooltip title='Add Actors'><IconButton onClick={()=>this.handleDrawerToggle()}>+</IconButton></Tooltip>
                    </Typography>
                    {d.actors.map((i,k)=><CombatQuickSheet key={i.key} data={i} isTurn={t === k} onRemove={()=>this.remove(k)} onChange={(f,v)=>this.changeActor(k,f,v)}/>)}
                </main>
                <Hidden mdUp>
                    <Drawer classes={{paper:c.drawer}} variant="temporary" anchor='right' open={this.state.mobileOpen} onClose={()=>this.handleDrawerToggle()} ModalProps={{keepMounted: true}}>
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden smDown className={c.permDrawer} implementation="css">
                    <Drawer classes={{paper:c.permDrawer}} open={this.state.mobileOpen} onClose={()=>this.handleDrawerToggle()} anchor='right' >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Snackbar
                    open={this.state.showSaveSnackbar}
                    onClose={()=>this.setState({showSaveSnackbar:false})}
                    message={<span id="message-id">Saved</span>}
                    />
            </div>
        }
        else
        {
            return <div>Loading</div>
        }
        
    }
}

export default withStyles(style)(CombatSet)
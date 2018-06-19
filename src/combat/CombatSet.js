import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Link, Route, Switch } from 'react-router-dom'
import API from '../api/API';
import CombatQuickSheet, {ProduceDefaultData} from './CombatQuickSheet';
import { Typography, List, ListItem, Hidden, Drawer, IconButton, Tooltip, Button } from '@material-ui/core';
import SheetDrawer from './SheetDrawer';

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
        this.saveTime = setTimeout(()=>api.saveCombatSet(set),10000)
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

    render() {
        let c = this.props.classes
        let id = this.props.match.params.combatID
        if(this.state && this.state.data)
        {
            let drawer = <SheetDrawer onAdd={(t,i)=>this.addActor(t,i)}/>
            let d = this.state.data
            let t = (d.turn % d.actors.length)
            return <div>
                <main className={c.root}>
                    <Typography variant='title'>
                        Combat [{d.name}]
                        <Button onClick={()=>this.nextTurn()}>Next Turn</Button>
                        <Button onClick={()=>this.sort()}>Sort</Button>
                        <Tooltip title='Add Actors'><IconButton onClick={()=>this.handleDrawerToggle()}>+</IconButton></Tooltip>
                    </Typography>
                    {d.actors.map((i,k)=><CombatQuickSheet key={k+i.id} data={i} isTurn={t == k} onChange={(f,v)=>this.changeActor(k,f,v)}/>)}
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
            </div>
        }
        else
        {
            return <div>Loading</div>
        }
        
    }
}

export default withStyles(style)(CombatSet)
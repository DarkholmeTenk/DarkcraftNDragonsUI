import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Link, Route, Switch } from 'react-router-dom'
import API from '../api/API';
import CombatQuickSheet from './CombatQuickSheet';
import { Typography, List, ListItem, Hidden, Drawer, IconButton } from '@material-ui/core';
import SheetDrawer from './SheetDrawer';

const style = theme=>({
    root: {},
    drawer:{
        minWidth:'20%',
        maxWidth:'75%'
    }
})

const api = new API()

class CombatSet extends Component {
    componentDidMount() {
        this.refresh()
    }
    
    refresh() {
        let id = this.props.match.params.combatID
        return api.requestCombatSet(id)
            .then(l=>{console.log(l); return l;})
            .then((data)=>this.setState({data:data}))
    }

    saveCombatSet(set) {
        return api.saveCombatSet(set)
    }

    addActor(type, id) {
        return api.requestSheet(type, id)
            .then(sheet=>{
                let d = JSON.parse(JSON.stringify(this.state.data))
                d.actors.push(CombatQuickSheet.produceDefaultData(sheet))
                return this.save(d)
            })
            .then((data)=>this.setState({data:data}))
    }

    changeActor(i, field, val) {
        let d = JSON.parse(JSON.stringify(this.state.data))
        d.actors[i][field] = val;
        return this.save(d)
            .then((data)=>this.setState({data:data}))
    }

    handleDrawerToggle(){
        this.setState({mobileOpen:!this.state.mobileOpen})
    }

    render() {
        let c = this.props.classes
        let id = this.props.match.params.combatID
        if(this.state && this.state.data)
        {
            let drawer = <SheetDrawer onAdd={(a)=>this.addActor(a)}/>
            let d = this.state.data
            return <div className={c.root}>
                <Typography variant='title'>
                    Combat [{d.name}]
                    <Hidden mdUp><IconButton onClick={()=>this.handleDrawerToggle()}>+</IconButton></Hidden>
                </Typography>
                <List>
                    {d.actors.map((i,k)=><ListItem key={k}><CombatQuickSheet data={i}/></ListItem>)}
                </List>
                <Hidden mdUp>
                    <Drawer classes={{paper:c.drawer}} variant="temporary" anchor='right' open={this.state.mobileOpen} onClose={()=>this.handleDrawerToggle()} ModalProps={{keepMounted: true}}>
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                <Drawer classes={{paper:c.drawer}} variant="permanent" anchor='right' open>
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
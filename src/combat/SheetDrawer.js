import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction, Button, IconButton } from '@material-ui/core';
import MonsterList from '../monster/MonsterList';
import API from '../api/API.js';

import monster from '../icons/sharp-smile.svg'

const style = theme => ({
    root:{
    },
    nav:{
        position:'sticky',
        bottom:'0px',
        width:'100%'
    },
    navIcon:{
        width:'16px',
        height:'16px'
    }
})

const api = new API()

class SheetDrawer extends Component {
    constructor() {
        super()
        this.state = {drawer:0}
    }

    openDrawer(e,i) {
        this.setState({drawer:i})
    }

    clickMonster(n) {
        api.requestMonsterData(n)
            .then(d=>this.props.onAdd('MONSTER',d.id))
    }
    
    getContents() {
        if(this.state.drawer == 0)
            return <MonsterList onAdd={n=>this.clickMonster(n)} noDetail />
    }

    render()
    {
        let c = this.props.classes
        let s = this.state
        return <div className={c.root}>
            DRAWER
            {this.getContents()}
            <BottomNavigation className={c.nav} value={s.drawer} onChange={(e,i)=>this.openDrawer(e,i)}showLabels>
                <BottomNavigationAction label='Monsters' icon={<img src={monster} className={c.navIcon} alt='monsters' />}/>
                <BottomNavigationAction label='Quick Sheets'/>
            </BottomNavigation>
        </div>
    }
}

export default withStyles(style)(SheetDrawer)
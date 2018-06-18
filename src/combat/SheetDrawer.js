import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import MonsterList from '../monster/MonsterList';

const style = theme => ({
    root:{
    },
    nav:{
        position:'absolute',
        bottom:'0px',
        width:'100%'
    }
})

class SheetDrawer extends Component {
    constructor() {
        super()
        this.state = {drawer:0}
    }

    openDrawer(e,i) {
        this.setState({drawer:i})
    }
    
    getContents() {
        if(this.state.drawer == 0)
            return <MonsterList />
    }

    render()
    {
        let c = this.props.classes
        let s = this.state
        return <div className={c.root}>
            DRAWER
            {this.getContents()}
            <BottomNavigation className={c.nav} value={s.drawer} onChange={(e,i)=>this.openDrawer(e,i)}showLabels>
                <BottomNavigationAction label='Monsters' icon='M'/>
                <BottomNavigationAction label='Quick Sheets'/>
            </BottomNavigation>
        </div>
    }
}

export default withStyles(style)(SheetDrawer)
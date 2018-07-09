import React, {Component} from 'react'
import { withStyles, Paper } from '@material-ui/core';
import API from '../api/API';
import Field from '../helper/Field';
import MoveSheet from '../helper/MoveSheet';
import StatSheet from '../helper/StatSheet';

import armor from '../icons/breastplate.svg'
import hp from '../icons/health-normal.svg'
import pp from '../icons/eyeball.svg'

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

class PlayerSheet extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const c = this.props.classes
        let d = this.props.data
        return <div className={c.root} >
            <div className={c.div}>
                <Field classes={{div:c.regular}} image={armor} desc="AC" value={d.ac} />
                <Field classes={{div:c.regular}} image={hp} desc="Max HP" value={d.maxHP} />
                <Field classes={{div:c.regular}} image={pp} desc="Passive Perception" value={d.pp} />
                <Paper className={c.regular}><StatSheet data={d.abilities} saves={d.savingThrows}/></Paper>
                <Paper className={c.regular}><MoveSheet data={d.speed}/></Paper>
            </div>
        </div>
    }
}

export default withStyles(style)(PlayerSheet)
import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Field from './Field.js'
import StatSheet from './StatSheet.js'
import MoveSheet from './MoveSheet.js'

import armor from '../icons/breastplate.svg'
import hp from '../icons/health-normal.svg'
import cr from '../icons/half-dead.svg'
import pp from '../icons/eyeball.svg'

const style = theme=>({
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
    }
})

class CombatSheet extends Component {
    render()
    {
        const c = this.props.classes
        const d = this.props.data
        return <div className={c.div}>
            <Field classes={{div:c.regular}} image={armor} desc="AC" value={d.ac} />
            <Field classes={{div:c.regular}} image={hp} desc="Max HP" value={d.maxHP} />
            <Field classes={{div:c.regular}} image={cr} desc="Challenge Rating" value={d.cr} />
            <Field classes={{div:c.regular}} image={pp} desc="Passive Perception" value={d.pp} />
            <Paper className={c.regular}><StatSheet data={d.abilities} saves={d.savingThrows}/></Paper>
            <Paper className={c.regular}><MoveSheet data={d.speed}/></Paper>
            </div>
    }
}

export default withStyles(style)(CombatSheet)
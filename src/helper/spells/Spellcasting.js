import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Ability from '../Ability.js'
import Field from '../Field.js'

import bullseye from '../../icons/bullseye.svg'
import d20 from '../../icons/d20.svg'

const styles = theme => ({
    root: {},
    fieldContainer:{
        display: "flex",
        flexDirection:"row",
        justifyContent:"space-evenly"
    },
    slotsContainer: {},
    slot:{},
    spell:{}
})

class Spellcasting extends Component {
    getSlotArray() {
        let d = this.props.data
        let c = this.props.classes
        return Object.keys(d.spells).map((i)=>{
            let s = d.spells[i]
            let slots = d.slots[i] || "-"
            return <div key={i} className={c.slot}>
                <Typography variant='caption'>Level: {i} - {slots} Slots</Typography>
                {s.map((spell,slot)=><div key={slot} className={c.spell}>{spell}</div>)}
            </div>
        })
    }

    render() {
        let d = this.props.data
        let c = this.props.classes
        return <div className={c.root}>
            <Typography variant='subheading'>Spellcasting</Typography>
            <div className={c.fieldContainer}>
                <Field image={Ability.getImage(d.ability)} desc='Spellcasting Skill' value={d.ability}/>
                <Field image={bullseye} desc="Spell Attack Modifier" value={d.attackMod}/>
                <Field image={d20} desc="Spell Save DC" value={d.dc}/>
            </div>
            <div className={c.slotsContainer}>
                {this.getSlotArray()}
            </div>
        </div>
    }
}

export default withStyles(styles)(Spellcasting)
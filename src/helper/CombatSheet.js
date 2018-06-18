import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import Field from './Field.js'
import StatSheet from './StatSheet.js'
import MoveSheet from './MoveSheet.js'
import FeatureList from './FeatureList.js'
import Spellcasting from './spells/Spellcasting';

import armor from '../icons/breastplate.svg'
import hp from '../icons/health-normal.svg'
import cr from '../icons/half-dead.svg'
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
    featureContainer:{
        display: 'flex',
        justifyContent:'space-evenly',
        flexWrap: 'wrap',
        width: '100%'
    },
    featurePaper: {
        flexBasis:'25%',
        flexGrow:1,
        padding: '8px',
        margin: '8px'
    }
})

class CombatSheet extends Component {
    featureList(name, key) {
        const c = this.props.classes;
        const d = this.props.data;
        if(d[key] && d[key].length > 0)
            return <Paper className={c.featurePaper}><FeatureList data={d[key]} name={name} /></Paper>
    }

    spellList() {
        const c = this.props.classes;
        const d = this.props.data;
        if(d.spellcasting)
            return <Paper className={c.featurePaper}><Spellcasting data={d.spellcasting} /></Paper>
    }

    render()
    {
        const c = this.props.classes
        const d = this.props.data
        return <div className={c.root}>
            <div className={c.div}>
                <Field classes={{div:c.regular}} image={armor} desc="AC" value={d.ac} />
                <Field classes={{div:c.regular}} image={hp} desc="Max HP" value={d.maxHP} />
                <Field classes={{div:c.regular}} image={cr} desc="Challenge Rating" value={d.cr} />
                <Field classes={{div:c.regular}} image={pp} desc="Passive Perception" value={d.pp} />
                <Paper className={c.regular}><StatSheet data={d.abilities} saves={d.savingThrows}/></Paper>
                <Paper className={c.regular}><MoveSheet data={d.speed}/></Paper>
                <Divider />
            </div>
            <div className={c.featureContainer}>
                {this.featureList("Actions", "actions")}
                {this.featureList("Special Abilities", "specialAbilities")}
                {this.featureList("Legendary Actions","legendaryActions")}
                {this.spellList()}
            </div>
        </div>
    }
}

export default withStyles(style)(CombatSheet)
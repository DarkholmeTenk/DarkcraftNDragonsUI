import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';

import Tooltip from '@material-ui/core/Tooltip';

import Field from './Field.js'
import str from '../icons/weight-lifting-up.svg'
import dex from '../icons/bullseye.svg'
import con from '../icons/first-aid-kit.svg'
import int from '../icons/smart.svg'
import wis from '../icons/owl.svg'
import cha from '../icons/charm.svg'

const style = theme=>({
    div:{
        display: 'flex',
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    statBlock:{
        padding:'5px',
        display:'table'
    },
    midField:{
        marginRight: '8px'
        // borderRight: '1px solid #444444'
    },
    mods:{
        fontSize:'18px',
        display:'table-row'
    },
    stat:{
        fontSize:'12px',
        paddingLeft:'4px',
        paddingRight:'4px',
        display:'table-row'
    },
    save:{
        fontSize:'18px',
        display:'table-row'
    }
})

class StatSheet extends Component {

    formatMod(mod){
        if(mod === 0)
            return "-";
        else if(mod > 0)
            return "+" + mod
        else return mod
    }

    getStat(img, desc, vstr, skipBorder) {
        const d = this.props.data
        const s = this.props.saves;
        let value = d[vstr] || 10
        let save = s[vstr] || 0
        let mod = null;
        let classes = this.props.classes
        if(value)
            mod = Math.floor((value - 10) / 2)
        let x = <div className={classes.statBlock}>
            <Tooltip title='Modifier'><span className={classes.mods}>{this.formatMod(mod)}</span></Tooltip>
            <Tooltip title='Stat'><span className={classes.stat}>{value}</span></Tooltip>
            <Tooltip title='Saving Throw Mod'><span className={classes.save}>{this.formatMod(save)}</span></Tooltip>
        </div>
        let y = skipBorder ? "" : this.props.classes.midField
        return <Field image={img} desc={desc} classes={{div:y}} value={x} /> 
    }

    render()
    {
        const c = this.props.classes
        
        return <div className={c.div}>
            {this.getStat(str, "Strength", 'str')}
            {this.getStat(dex, "Dexterity", 'dex')}
            {this.getStat(con, "Constitution", 'con')}
            {this.getStat(int, "Intelligence", 'int')}
            {this.getStat(wis, "Wisdom", 'wis')}
            {this.getStat(cha, "Charisma", 'chr', true)}
            </div>
    }
}

export default withStyles(style)(StatSheet)
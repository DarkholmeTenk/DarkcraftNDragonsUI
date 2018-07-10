import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';

import Tooltip from '@material-ui/core/Tooltip';

import Field from './Field.js'
import Ability from  './Ability.js'
import { TextField } from '@material-ui/core';

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
    field:{
        width:'50px'
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

    getEditable(desc, vstr, skipBorder) {
        const d = this.props.data || {};
        const s = this.props.saves || {};
        let img = Ability.getImage(vstr);
        let value = d[vstr] || 10
        let save = s[vstr] || 0
        let mod = null;
        let classes = this.props.classes
        if(value)
            mod = Math.floor((value - 10) / 2)
        let x = <div className={classes.statBlock}>
            <Tooltip title='Modifier'><span className={classes.mods}>{this.formatMod(mod)}</span></Tooltip>
            <Tooltip title='Stat'><span className={classes.stat}>
                <TextField className={classes.field} value={value} onChange={e=>this.props.onChange(vstr,e.target.value)}/>
            </span></Tooltip>
            <Tooltip title='Saving Throw Mod'><span className={classes.save}>
            <TextField className={classes.field} value={save} onChange={e=>this.props.onChangeSave(vstr,e.target.value)}/>
            </span></Tooltip>
        </div>
        let y = skipBorder ? "" : this.props.classes.midField
        return <Field image={img} desc={desc} classes={{div:y}} value={x} /> 
    }

    getStat(desc, vstr, skipBorder) {
        const d = this.props.data || {};
        const s = this.props.saves || {};
        let img = Ability.getImage(vstr);
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
        
        if(this.props.onChange && this.props.onChangeSave)
        {
            return <div className={c.div}>
                    {this.getEditable("Strength", 'str')}
                    {this.getEditable("Dexterity", 'dex')}
                    {this.getEditable("Constitution", 'con')}
                    {this.getEditable("Intelligence", 'int')}
                    {this.getEditable("Wisdom", 'wis')}
                    {this.getEditable("Charisma", 'chr', true)}
                </div>
        }
        else
        {
            return <div className={c.div}>
                    {this.getStat("Strength", 'str')}
                    {this.getStat("Dexterity", 'dex')}
                    {this.getStat("Constitution", 'con')}
                    {this.getStat("Intelligence", 'int')}
                    {this.getStat("Wisdom", 'wis')}
                    {this.getStat("Charisma", 'chr', true)}
                </div>
        }
    }
}

export default withStyles(style)(StatSheet)
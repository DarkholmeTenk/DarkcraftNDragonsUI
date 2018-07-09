import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';

import Field from './Field.js'
import walk from '../icons/walking-boot.svg'
import swim from '../icons/swimfins.svg'
import fly from '../icons/liberty-wing.svg'
import climb from '../icons/ladder.svg'
import burrow from '../icons/dig-dug.svg'
import { TextField } from '@material-ui/core';


const style = theme=>({
    div:{
        display: 'flex',
        flexDirection:'row',
        justifyContent:'space-evenly',
        height:'100%'
    },
    moveBlock:{
        padding:'5px',
        display:'table'
    },
    midField:{
        marginRight: '8px'
    },
    field:{
        width:'50px'
    },
    ground:{},swim:{},fly:{},climb:{},burrow:{}
})

const moveTypes = [
    { name:"ground", icon: walk, display: "Ground" },
    { name:"swim", icon: swim, display: "Swim" },
    { name:"fly", icon:fly, display: "Fly" },
    { name:"climb", icon:climb, display: "Climb" },
    { name:"burrow", icon:burrow, display: "Burrow" }]

class MoveSheet extends Component {
    getStat(type) {
        const d = this.props.data
        if(!d || !d[type.name])
            return
        return <Field key={type.name} desc={type.display} image={type.icon} value={d[type.name]} />
    }

    getEditableStat(type)
    {
        let v = "";
        if(this.props.data && this.props.data[type.name])
            v = this.props.data[type.name]
        return <Field key={type.name} desc={type.display} image={type.icon} value={<TextField label={type.display} value={v} onChange={e=>this.props.onChange(type.name, e.target.value)}/>} />
    }

    render()
    {
        const c = this.props.classes
        if(this.props.onChange)
        {
            return <div className={c.div}>
                {moveTypes.map((t)=>this.getEditableStat(t))}
            </div>
        }
        else
        {
            let x = moveTypes.map((t)=>this.getStat(t))
            if(x.length === 0)
                return <div className={c.div}>No Move Speeds :'(</div>

            return <div className={c.div}>
                {x}
                </div>
        }
    }
}

export default withStyles(style)(MoveSheet)
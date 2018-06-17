import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';

import Field from './Field.js'
import walk from '../icons/walking-boot.svg'
import swim from '../icons/swimfins.svg'
import fly from '../icons/liberty-wing.svg'
import climb from '../icons/ladder.svg'
import burrow from '../icons/dig-dug.svg'


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
        if(!d[type.name])
            return
        return <Field key={type.name} desc={type.display} image={type.icon} value={d[type.name]} />
    }

    render()
    {
        const c = this.props.classes
        
        let x = moveTypes.map((t)=>this.getStat(t))
        if(x.length === 0)
            return <div className={c.div}>No Move Speeds :'(</div>

        return <div className={c.div}>
            {x}
            </div>
    }
}

export default withStyles(style)(MoveSheet)
import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Field from './Field.js'
import bonus from '../icons/bullseye.svg'
import damageBonus from '../icons/wood-club.svg'
import d8 from '../icons/d8.svg'

const style = theme =>({
    main: {},
    numbers: {
        display:'flex',
        flexDirection:'row',
        textAlign:'center'
    },
    name: {},
    text: {}
})

class Feature extends Component {
    statField(image, desc, valueName)
    {
        let v = this.props.data[valueName]
        if(v != null && v !== 0) {
            return <Field image={image} desc={desc} value={v} />
        }
    }

    splitText(t){
        if(t) {
            return t.split('. ').map(i=>i+".")
        }
    }

    render() {
        let c = this.props.classes
        return <div>
            <Typography variant='subheading' className={c.name}>{this.props.data.name}</Typography>
            <div className={c.numbers}>
                {this.statField(bonus, "Attack Bonus", "attackBonus")}
                {this.statField(d8, "Damage Dice", "damageDice")}
                {this.statField(damageBonus, "Damage Bonus", "damageBonus")}
            </div>
            {this.splitText(this.props.data.desc).map((t,i)=><Typography key={i} className={c.text}>{t}</Typography>)}
        </div>
    }
}

export default withStyles(style)(Feature)
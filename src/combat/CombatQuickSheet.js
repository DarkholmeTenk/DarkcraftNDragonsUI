import React, { Component } from 'react' 
import MonsterDetails from '../monster/MonsterDetails';
import Field from '../helper/Field';

import health from '../icons/health-normal.svg'
import { Typography } from '@material-ui/core';

class CombatQuickSheet extends Component {
    constructor(){
        super()
        this.state = {}
    }

    getDetails() {
        const d = this.props.data

        if(d.type == "MONSTER" && this.state.monster)
            return <MonsterDetails data={this.state.monster} />
    }

    render(){
        const d = this.props.data

        return <div>
                <Typography variant='display1'>{d.sheetName}</Typography>
                <Field image={health} desc="Current Health" value={d.hp} />
            </div>
    }
}

CombatQuickSheet.produceDefaultData = function(realSheet) {
    return {
        type:realSheet.sheetType,
        id:realSheet.id,
        hp:realSheet.maxHP,
        quickName:"",
        sheetName:realSheet.name,
        notes:"",
        initiative:-1
    }
}

export default CombatQuickSheet
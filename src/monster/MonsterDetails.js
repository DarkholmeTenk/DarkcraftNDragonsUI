import React, {Component} from 'react'
import LinearProgress from '@material-ui/core/LinearProgress';
import CombatSheet from '../helper/CombatSheet.js'

class MonsterDetails extends Component {
    constructor(){
        super()
        this.state = {}
    }

    render() {
        if(this.props.data)
        {
            const d = this.props.data
            return <CombatSheet data={d} />
        }
        return <LinearProgress />
    }
}

export default MonsterDetails
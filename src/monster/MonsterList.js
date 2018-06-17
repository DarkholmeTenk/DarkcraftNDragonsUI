import React, {Component} from 'react';
import MonsterInfo from './MonsterInfo.js';
import API from '../api/API.js'

import TextField from '@material-ui/core/TextField';

const api = new API()

class MonsterList extends Component {
    constructor() {
        super()
        this.state = {monsters:[], filter:""}
        api.requestMonsterNames()
            .then(n=>this.setState({monsters:n}))
    }

    changeFilter(e){
        this.setState({filter:e.target.value})
    }

    render() {  
        let m = this.state.monsters
            .filter((d)=>d.toLowerCase().includes(this.state.filter.toLowerCase()))
            .map(i=><MonsterInfo name={i} key={i} />)
        return <div>
            <TextField label="Filter" defaultValue="" onChange={(e)=>this.changeFilter(e)} />
            {m}
        </div>
    }
}

export default MonsterList
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

    componentWillMount(){
        if(this.props && this.props.match.params.filter)
            this.setState({filter:this.props.match.params.filter})
    }

    changeFilter(e){
        let v = e.target.value
        this.setState({filter:v})
        if(this.props.history)
            this.props.history.push("/monsters/"+v)
    }

    render() {  
        let m = this.state.monsters
            .filter((d)=>d.toLowerCase().includes(this.state.filter.toLowerCase()))
            .map(i=><MonsterInfo name={i} key={i} />)
        return <div>
            <TextField label="Filter" defaultValue={this.props.match.params.filter} onChange={(e)=>this.changeFilter(e)} />
            {m}
        </div>
    }
}

export default MonsterList
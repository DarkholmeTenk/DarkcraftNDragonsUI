import React, {Component} from 'react'
import MonsterInfo from './MonsterInfo';
import API from '../api/API';
import MonsterDetails from './MonsterDetails';
import { Typography } from '@material-ui/core';

const api = new API()
class MonsterSheet extends Component {
    state = {}

    constructor(props) {
        super(props)
        this.name = props.match.params.monster
        api.requestMonsterData(this.name)
            .then(d=>this.setState({data:d}))
    }

    getDetails() {
        if(this.state.data)
            return <div><MonsterDetails data={this.state.data} /></div>
        return <div>LOADING</div>
    }

    render() {
        return <div>
            <Typography variant='title'>{this.name}</Typography>
            {this.getDetails()}
        </div>
    }
}

export default MonsterSheet
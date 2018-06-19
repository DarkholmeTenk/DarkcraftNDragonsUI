import React, {Component} from 'react';
import MonsterInfo from './MonsterInfo.js';
import API from '../api/API.js'

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Typography, IconButton } from '@material-ui/core';

const api = new API()

const style = theme=>({
    container:{
        display:'flex',
        flexDirection:'row'
    },
    title:{
        flexGrow:1
    }
})

class MonsterList extends Component {
    constructor() {
        super()
        this.state = {monsters:[], filter:""}
        api.requestMonsterNames()
            .then(n=>this.setState({monsters:n}))
    }

    getDefaultFilter() {
        if(this.props && this.props.match && this.props.match.params.filter)
            return this.props.match.params.filter
        return ""
    }

    componentWillMount(){
        this.setState({filter:this.getDefaultFilter()})
    }

    changeFilter(e){
        let v = e.target.value
        this.setState({filter:v})
        if(this.props.history)
            this.props.history.push("/monsters/"+v)
    }

    getAddButton(m)
    {
        if(this.props.onAdd)
            return <IconButton onClick={(e)=>{
                e.stopPropagation()
                this.props.onAdd(m)
            }}>+</IconButton>
    }

    getMonsterInfo(i) {
        let c = this.props.classes
        let noDetail = this.props.noDetail
        if(noDetail)
            return <div key={i} className={c.container}>
                <Typography variant='title' className={c.title}>{i}</Typography>
                {this.getAddButton(i)}
            </div>
        else
            return <MonsterInfo name={i} key={i} summaryInfo={this.getAddButton(i)}/>
    }

    render() {  
        let m = this.state.monsters
            .filter((d)=>d.toLowerCase().includes(this.state.filter.toLowerCase()))
            .map(i=>this.getMonsterInfo(i))
        return <div>
            <TextField label="Filter" defaultValue={this.getDefaultFilter()} onChange={(e)=>this.changeFilter(e)} />
            {m}
        </div>
    }
}

export default withStyles(style)(MonsterList)
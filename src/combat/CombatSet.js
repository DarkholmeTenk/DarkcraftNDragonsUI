import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Link, Route, Switch } from 'react-router-dom'
import API from '../api/API';

const style = theme=>{
    root: {}
}

const api = new API()

class CombatSet extends Component {
    componentDidMount() {
        let id = this.props.match.params.combatID
        api.requestCombatSet(id)
            .then((data)=>this.setState({data:data}))
    }

    saveCombatSet() {
        if(this.state && this.state.data)
            return api.saveCombatSet(this.state.data)
        else
            return Promise.reject("No state loaded")
    }

    render() {
        let c = this.props.classes
        let id = this.props.match.params.combatID
        if(this.state && this.state.data)
        {
            return <div className={c.root}>
                Combat set {id}
            </div>
        }
        else
        {
            return <div>Loading</div>
        }
        
    }
}

export default withStyles(style)(CombatSet)
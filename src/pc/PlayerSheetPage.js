import React, {Component} from 'react'
import { withStyles } from '@material-ui/core';
import API from '../api/API';
import { Route, Switch } from 'react-router-dom'
import PlayerList from './PlayerList';
import PlayerSheet from './PlayerSheet';

const api = new API()

const style = theme=>({
    root:{}
})

class PlayerSheetPage extends Component {
    constructor(props) {
        super(props)
        this.id = props.match.params.id
        this.state = {
            sheet:{}
        }
    }

    componentWillMount() {
        api.requestSheet("QUICK",this.id)
            .then(d=>this.setState({sheet:d}))
    }

    render() {
        const c = this.props.classes
        return <div className={c.root} >
            {this.id}
            {JSON.stringify(this.state.sheet)}
        </div>
    }
}

export default withStyles(style)(PlayerSheetPage)
import React, {Component} from 'react'
import { withStyles } from '@material-ui/core';
import API from '../api/API';
import { Route, Switch } from 'react-router-dom'
import PlayerList from './PlayerList';

const api = new API()

const style = theme=>({
    root:{}
})

class PlayerPage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const m = this.props.match
        const c = this.props.classes
        return <div className={c.root} >
            <Switch>
                <Route path={m.path} component={PlayerList} />
            </Switch>
        </div>
    }
}

export default withStyles(style)(PlayerPage)
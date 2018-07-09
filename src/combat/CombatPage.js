import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom'
import CombatSetList from './CombatSetList';
import CombatSet from './CombatSet';

const style = theme=>{
    root: {}
}

class CombatPage extends Component {
    render() {
        const {match} = this.props
        console.log(match.path)
        let c = this.props.classes
        return <div className={c.root}>
            <Switch>
                <Route path={match.path + ':combatID'} component={CombatSet}/>
                <Route path={match.path} component={CombatSetList}/>
            </Switch>
        </div>
    }
}

export default withStyles(style)(CombatPage)
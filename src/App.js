import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button'

import './App.css';

import MonsterList from './monster/MonsterList.js';
import CombatPage from './combat/CombatPage.js'
import MonsterSheet from './monster/MonsterSheet';
import PlayerPage from './pc/PlayerPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Button component={Link} color="inherit" to='/monsters'>Monsters</Button>
            <Button component={Link} color="inherit" to='/players'>Players</Button>
            <Button component={Link} color="inherit" to='/combat'>Combat</Button>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route path='/monster/:monster' component={MonsterSheet}/>
          <Route path='/monsters/:filter?' component={MonsterList}/>
          <Route path='/players/' component={PlayerPage}/>
          <Route path='/combat/' component={CombatPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;

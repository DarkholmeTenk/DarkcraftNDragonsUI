import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button'

import './App.css';

import MonsterList from './monster/MonsterList.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Button component={Link} color="inherit" to='/monsters'>Monsters</Button>
          </Toolbar>
        </AppBar>
        <Route path='/monsters/:filter?' component={MonsterList}/>
      </div>
    );
  }
}

export default App;

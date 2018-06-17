import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'

import './App.css';

import MonsterList from './monster/MonsterList.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Link to='/monsters'>Test</Link>
        <Route path='/monsters/:filter?' component={MonsterList}/>
      </div>
    );
  }
}

export default App;

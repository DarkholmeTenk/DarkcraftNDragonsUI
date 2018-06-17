import React, { Component } from 'react';
import './App.css';

import MonsterList from './monster/MonsterList.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MonsterList />
      </div>
    );
  }
}

export default App;

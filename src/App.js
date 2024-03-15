import React, { Component } from 'react';
import './App.css';
import GridStateGenerator from './board/gridStateGenerator';

class App extends Component {
  render() {

    return (
      <div className="App">
        <GridStateGenerator/>
      </div>
    );
  }
}

export default App;

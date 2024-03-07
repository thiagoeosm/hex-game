import React, { Component } from 'react';
import { HexGrid, Layout, Hexagon, GridGenerator, Pattern } from 'react-hexgrid';
import './App.css';

class App extends Component {
  render() {
    const hexagons = GridGenerator.hexagon(3).filter(hex => !(hex.q==0 && hex.r==0 && hex.s==0));

    return (
      <div className="App">
        <h1>Basic example of HexGrid usage.</h1>
        <HexGrid width={1200} height={1000}>
          <Layout size={{ x: 7, y: 7 }}>
            { hexagons.map((hex, i) => <Hexagon key={i} q={hex.q} r={hex.r} s={hex.s} />) }
            <Hexagon key={999} q={0} r={0} s={0} fill="knight-pat"/>
          </Layout>
          <Pattern id="knight-pat" link="https://www.iconpacks.net/icons/2/free-knight-helmet-icon-2747-thumb.png" size={{x:7, y:7}} />
        </HexGrid>
      </div>
    );
  }
}

export default App;

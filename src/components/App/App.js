import React, { Component } from 'react';
import './App.css';
import Chart from '../Chart/Chart';
import Selector from '../Selector/Selector';
import Orderbook from '../Orderbook/Orderbook';

class App extends Component {
  
  render() {
    const socket = io();
    return (
      <div className='app-container'>
        <header className='header-title'>Combined Orderbook</header>
        <Chart />
        <div className='orderbooks'>
          <Orderbook />
          <Orderbook />
        </div>
      </div>
    );
  }
}

export default App;

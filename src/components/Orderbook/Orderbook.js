import React, { Component } from 'react';
import './Orderbook.css';
import Selector from '../ExchangeSelector/Selector';

class Orderbook extends Component {
  render() {
    return (
      <div className="oderbook-container">
        <Selector />
        
      </div>
    );
  }
}

export default Orderbook;
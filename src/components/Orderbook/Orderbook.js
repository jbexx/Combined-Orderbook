import React, { Component } from 'react';
import './Orderbook.css';

class Orderbook extends Component {
  render() {
    console.log('props in orderbook comp', this.props);

    const { exchange, orders } = this.props;
    const cleanedExchangeName = exchange.split('_').join(' ').toUpperCase();
    const mappedExchangeInfo = orders.map( order => {
      return(
        <div className='row'>
          <p className='data'>{ order.bid_volume }</p>
          <p className='data'>{ order.bid }</p>
          <p className='data'>{ order.ask }</p>
          <p className='data'>{ order.ask_volume }</p>
        </div>
      );
    });
    
    return (
      <div className='oderbook-container'>
        <h1 className='exchange'>{ cleanedExchangeName }</h1>
        <div className='title-row'>
          <h3>Volume</h3>
          <h3>Bid</h3>
          <h3>Ask</h3>
          <h3>Volume</h3>
        </div>
        { mappedExchangeInfo }
      </div>
    );
  };
};

export default Orderbook;
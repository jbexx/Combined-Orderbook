import React, { Component } from 'react';
import './Orderbook.css';
import { object, string } from 'prop-types';

class Orderbook extends Component {
  render() {
    const { exchange, orders } = this.props;
    const cleanedExchangeName = exchange.split('_').join(' ').toUpperCase();
    const mappedExchangeInfo = orders.map( (order, i) => {
      return(
        <tr key={i} className='row'>
          <td className='data'>{ order.bid_volume }</td>
          <td className='data'>{ order.bid }</td>
          <td className='data'>{ order.ask }</td>
          <td className='data'>{ order.ask_volume }</td>
        </tr>
      );
    });
    
    return (
      <div className='orderbook-container'>
        <h1 className='exchange'>{ cleanedExchangeName }</h1>
        <table className='exchange-table'>
          <thead>
            <tr className='row'>
              <th className='data-title'>Volume</th>
              <th className='data-title'>Bid</th>
              <th className='data-title'>Ask</th>
              <th className='data-title'>Volume</th>
            </tr>
          </thead>
          <tbody className='table-body'>
            { mappedExchangeInfo }
          </tbody>
        </table>
      </div>

      );
  };
};

export default Orderbook;

Orderbook.PropTypes = {
  exchange: string,
  orders: object
}

import React, { Component } from 'react';
import './Orderbook.css';

class Orderbook extends Component {
  render() {
    console.log('props in orderbook comp', this.props);

    const { exchange, orders } = this.props;
    const cleanedExchangeName = exchange.split('_').join(' ').toUpperCase();
    const mappedExchangeInfo = orders.map( order => {
      return(
        <tr className='row'>
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
      // <div className='oderbook-container'>
      //   <h1 className='exchange'>{ cleanedExchangeName }</h1>
      //   <div className='title-row'>
      //     <h3>Volume</h3>
      //     <h3>Bid</h3>
      //     <h3>Ask</h3>
      //     <h3>Volume</h3>
      //   </div>
      //   { mappedExchangeInfo }
      // </div>
  };
};

export default Orderbook;
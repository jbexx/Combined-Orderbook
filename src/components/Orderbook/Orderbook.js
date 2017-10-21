import React, { Component } from 'react';
import './Orderbook.css';

class Orderbook extends Component {
  render() {
    return (
      <div className='oderbook-container'>
        <div className='book-table'>
          <h1 className='exchange'>Bittrex</h1>
          <div className='title-row'>
            <h3>Volume</h3>
            <h3>Bid</h3>
            <h3>Price</h3>
            <h3>Ask</h3>
            <h3>Volume</h3>
          </div>
          {/* will map through prices and append here but will have a place holder for now */}
          <div className='row'>
            <p className='data'>10m</p>
            <p className='data'>5,950</p>
            <p className='data'>5,951</p>
            <p className='data'>5,952</p>
            <p className='data'>9.8m</p>
          </div>
          <div className='row'>
            <p className='data'>10m</p>
            <p className='data'>5,950</p>
            <p className='data'>5,951</p>
            <p className='data'>5,952</p>
            <p className='data'>9.8m</p>
          </div>
          <div className='row'>
            <p className='data'>10m</p>
            <p className='data'>5,950</p>
            <p className='data'>5,951</p>
            <p className='data'>5,952</p>
            <p className='data'>9.8m</p>
          </div>
          <div className='row'>
            <p className='data'>10m</p>
            <p className='data'>5,950</p>
            <p className='data'>5,951</p>
            <p className='data'>5,952</p>
            <p className='data'>9.8m</p>
          </div>
          <div className='row'>
            <p className='data'>10m</p>
            <p className='data'>5,950</p>
            <p className='data'>5,951</p>
            <p className='data'>5,952</p>
            <p className='data'>9.8m</p>
          </div>
          <div className='row'>
            <p className='data'>10m</p>
            <p className='data'>5,950</p>
            <p className='data'>5,951</p>
            <p className='data'>5,952</p>
            <p className='data'>9.8m</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Orderbook;
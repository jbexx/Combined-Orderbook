import React, { Component } from 'react';
import './App.css';
import Chart from '../Chart/Chart';
import Selector from '../Selector/Selector';
import Orderbook from '../Orderbook/Orderbook';

class App extends Component {
  constructor() {
    super()
    this.state = {
      books: {}
    }
  }

  componentDidMount() {
    fetch('/api/v1/poloniex_book')
    .then( response => response.json() )
    .then( data => console.log('data', data) )
    .catch( error => console.log({ error }) );
  }

  render() {
    const { bittrex, poloniex } = this.state.books;
    return (
      <div className='app-container'>
        <header className='header-title'>Combined Orderbook</header>
        <Chart />
        <div className='orderbooks'>
          <Orderbook book={ bittrex }/>
          <Orderbook book={ poloniex }/>
        </div>
      </div>
    );
  }
};

export default App;
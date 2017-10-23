import React, { Component } from 'react';
import './App.css';
import Chart from '../Chart/Chart';
// import Selector from '../Selector/Selector';
import Orderbook from '../Orderbook/Orderbook';

class App extends Component {
  constructor() {
    super()
    this.state = {
      books: {}
    }
  }

  componentDidMount() {
    fetch('/api/v1/all-books')
    .then( response => response.json() )
    .then( data => this.setState({ books: data }) )
    .catch( error => console.log({ error }) );
  };

  render() {
    const { books } = this.state;
    const bookKeys = Object.keys(books);
    const orderbooks = bookKeys.map( (book, i) => <Orderbook key={ book } exchange={ book } orders={ books[book] } /> );
    return (
      <div className='app-container'>
        <header className='header-title'>Combined Orderbook</header>
        <Chart orderbooks={ books } />
        <div className='orderbooks'>
          { orderbooks }
        </div>
      </div>
    );
  };
};

export default App;
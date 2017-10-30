import React, { Component } from 'react';
import './App.css';
import Chart from '../Chart/Chart';
import Login from '../Login/Login';
import Orderbook from '../Orderbook/Orderbook';
import gif from 'https://i.imgur.com/erX8pas.gif'

class App extends Component {
  constructor() {
    super()
    this.state = {
      books: {}
    }

    this.logIn = this.logIn.bind(this);
  }

  componentDidMount() {
    fetch('/api/v1/all-books')
    .then( response => response.json() )
    .then( data => {
      this.setState({ books: {
          bittrex_book: data.bittrex_book.slice(0, 50),
          poloniex_book: data.poloniex_book.slice(0, 50)
        }
      })
    })
    .catch( error => console.log({ error }) );
  };

  logIn(e) {
    e.preventDefault();
    
      fetch('/api/v1/user/authenticate', {
        method: 'POST',
        body: JSON.stringify({ email: document.querySelector('.email').value, password: document.querySelector('.password').value }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then( data => data.json())
        .then( token => console.log({ token }) )
        .catch( error => console.log({ error }) );
    
    document.querySelector('.email').value = '';
    document.querySelector('.password').value = '';
  }

  render() {
    const { books } = this.state;
    const bookKeys = Object.keys(books);
    console.log('books in app', bookKeys.length);
    
    const orderbooks = bookKeys.map( (book, i) => <Orderbook key={ book } exchange={ book } orders={ books[book] } /> );
    return (
      <div className='app-container'>
        { !bookKeys.length ? <div className='error-cover'> <img src={ gif } alt='wall-e gif' /><p>Sorry, our data seems to be hiding, please refresh the page</p></div> : null }
        <header className='header-title'>
          Combined Orderbook
          <Login submit={ this.logIn }/>
        </header>
        <Chart orderbooks={ books } />
        <div className='orderbooks'>
          { orderbooks }
        </div>
      </div>
    );
  };
};

export default App;
const bittrexBook = require('../../../bittrex-book.json');
const poloniexBook = require('../../../poloniex-book.json');

const createPoloniexBook = (knex, bid, ask) => {
  return knex('poloniex_book').insert({
    bid_volume: bid[1],
    bid: bid[0],
    ask: ask[0],
    ask_volume: ask[1]
  });
};

const createBittrexBook = (knex, bid, ask) => {
  return knex('bittrex_book').insert({
    bid_volume: bid.Quantity,
    bid: bid.Rate,
    ask: ask.Rate,
    ask_volume: ask.Quantity
  });
};

exports.seed = (knex, Promise) => {
  return knex('bittrex_book').del()
    .then( () => knex('poloniex_book').del() )
    .then( () => {
      const poloniexOrders = poloniexBook.bids.map( bid => poloniexBook.asks.map( ask => createPoloniexBook(knex, bid, ask) ) );
      const bittrexOrders = bittrexBook.result.buy.map( bid =>  bittrexBook.result.sell.map( ask => createBittrexBook(knex, bid, ask) ) );
      
      return Promise.all( ...poloniexOrders, ...bittrexOrders );
    })
    .catch(error => console.error('Error seeding data', error));    
};

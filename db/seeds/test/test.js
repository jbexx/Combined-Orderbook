const bittrexBook = require('../../../bittrex-book-test.json');
const poloniexBook = require('../../../poloniex-book-test.json');

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
      const poloniexOrders = [];
      const bittrexOrders = [];

      for (let i = 0; i < poloniexBook.bids.length; i++) {
        poloniexOrders.push( createPoloniexBook(knex, poloniexBook.bids[i], poloniexBook.asks[i]) );
      }

      for (let j = 0; j < bittrexBook.result.buy.length; j++) {
        bittrexOrders.push( createBittrexBook(knex, bittrexBook.result.buy[j], bittrexBook.result.sell[j]) );
      }

      return Promise.all([ ...poloniexOrders, ...bittrexOrders ]);
    })
    .catch(error => console.error('Error seeding data', error));    
};

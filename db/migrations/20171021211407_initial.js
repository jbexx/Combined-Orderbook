
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('bittrex_book', table => {
      table.increments('id').primary();
      table.string('bid_volume');
      table.string('bid');
      table.string('ask');
      table.string('ask_volume')
      table.timestamps(true, true);
    }),
    knex.schema.createTable('poloniex_book', table => {
      table.increments('id').primary();
      table.string('bid_volume');
      table.string('bid');
      table.string('ask');
      table.string('ask_volume')
      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('bittrex_book'),
    knex.schema.dropTable('poloniex_book')
  ])
};

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const jwt = require('jsonwebtoken');
const should = chai.should();
require('dotenv').config();

// "test": "NODE_ENV=test PORT=3002 mocha --exit",

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const token = jwt.sign({ email: 'test@shapeshift.io', password: 'password', admin: true }, process.env.SECRET_KEY);

chai.use(chaiHttp);

describe('Orderbook Routes', () => {
  before( done => {
    database.migrate.latest()
    .then( () => done() )
    .catch( (error) => console.log({ error }) );
  });
});

beforeEach( done => {
  database.seed.run()
  .then( () => done() )
  .catch( error => console.log({ error }) );
});

describe('Get /api/v1/book/:exchange_book', () => {
  it('should retrieve the appropriate table from the database', done => {
    chai.request(server)
      .get('/api/v1/book/bittrex_book')
      .end( (error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(2);
        response.body.forEach( elem => {
          elem.should.have.property('id');
          elem.should.have.property('bid_volume');
          elem.should.have.property('bid');
          elem.should.have.property('ask');
          elem.should.have.property('ask_volume');
      });
      done();
    });
  });

  it('should return a 404 if the parameter is not found', (done) => {
    chai.request(server)
      .get('/api/v1/book/')
      .end( (error, response) => {
        response.should.have.status(404);
        done();
      });
  });
});

describe('Get /api/v1/all-books', () => {
  it('should retrieve all exchange tables from the database', done => {
    chai.request(server)
      .get('/api/v1/all-books')
      .end( (error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('bittrex_book');
        response.body.should.have.property('poloniex_book');
        response.body.bittrex_book.should.be.a('array');
        response.body.poloniex_book.should.be.a('array');
        response.body.bittrex_book[0].should.have.property('id');
        response.body.bittrex_book[0].should.have.property('bid_volume');
        response.body.bittrex_book[0].should.have.property('bid');
        response.body.bittrex_book[0].should.have.property('ask');
        response.body.bittrex_book[0].should.have.property('ask_volume');
        response.body.bittrex_book[1].should.have.property('id');
        response.body.bittrex_book[1].should.have.property('bid_volume');
        response.body.bittrex_book[1].should.have.property('bid');
        response.body.bittrex_book[1].should.have.property('ask');
        response.body.bittrex_book[1].should.have.property('ask_volume');
        response.body.poloniex_book[0].should.have.property('id');
        response.body.poloniex_book[0].should.have.property('bid_volume');
        response.body.poloniex_book[0].should.have.property('bid');
        response.body.poloniex_book[0].should.have.property('ask');
        response.body.poloniex_book[0].should.have.property('ask_volume');
        response.body.poloniex_book[1].should.have.property('id');
        response.body.poloniex_book[1].should.have.property('bid_volume');
        response.body.poloniex_book[1].should.have.property('bid');
        response.body.poloniex_book[1].should.have.property('ask');
        response.body.poloniex_book[1].should.have.property('ask_volume');
        done();
      });
    });
    it('should return a 404 if the url is incorrect', (done) => {
      chai.request(server)
        .get('/api/v1/no-books')
        .end( (error, response) => {
          response.should.have.status(404);
          done();
        });
    });
});
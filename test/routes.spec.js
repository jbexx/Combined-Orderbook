const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Client Routes', () => {

  it.skip('should return the homepage', (done) => {
    chai.request(server)
      .get('/')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.html;
        response.res.text.should.include('Combined Orderbook');
        done();
      });
  });

  it.skip('should return a 404 for route that does not exist', (done) => {
    chai.request(server)
      .get('/deadend')
      .end((error, response) => {
        response.should.have.status(404);
        done();
      });
  });
});

describe('API Routes', () => {

  before( done => {
    database.migrate.latest()
      .then( () => done() )
      .catch( error  => console.log(error) );
  });

  beforeEach((done) => {
    database.seed.run()
      .then( () => done() )
      .catch( error => console.log(error) );
  });

  describe('POST /api/v1/user/authenticate', () => {
    it('should generate a token for new user', (done) => {
      chai.request(server)
        .post('/api/v1/user/authenticate')
        .send({
          email: 'me@shapeshift.io',
          password: 'youllneverguessit'
        })
        .end((error, response) => {
          response.should.have.status(201);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('token');
          done();
        });
    });

    it('should not return a token if missing data', (done) => {
      chai.request(server)
        .post('/api/v1/user/authenticate')
        .send({
          email: 'you@shapeshift.io'
        })
        .end((error, response) => {
          response.should.have.status(422);
          response.body.error.should.equal('You are missing a required parameter. Please include both email address and password.');
          done();
        });
    });
  });

});

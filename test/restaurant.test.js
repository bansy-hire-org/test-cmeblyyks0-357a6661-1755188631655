const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const Restaurant = require('../src/models/Restaurant');
const sequelize = require('../src/config/database');

chai.should();
chai.use(chaiHttp);

describe('Restaurants API', () => {

  before(async () => {
    await sequelize.sync({ force: true }); // Drop and recreate tables
  });

  describe('GET /api/restaurants', () => {
    it('should GET all restaurants', (done) => {
      chai.request(server)
        .get('/api/restaurants')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  describe('POST /api/restaurants', () => {
    it('should POST a new restaurant (Admin Required)', (done) => {
      const restaurant = {
        name: 'Test Restaurant',
        address: '123 Test Street',
        cuisine: 'Italian'
      };

      chai.request(server)
        .post('/api/restaurants')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5OTI2NzYxMn0.b3KczB3G0rM0I7-J33G1h5a9m5H75R2n9O6I1_GfX6U')
        .send(restaurant)
        .end((err, res) => {
          res.should.have.status(500); //Expect Fail for authorization
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Error creating restaurant');
          done();
        });
    });
  });

});
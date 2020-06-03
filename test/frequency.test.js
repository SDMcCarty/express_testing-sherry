const { expect } = require('chai');
const supertest = require('supertest');
const request = require('supertest');
const app = require('../app');

describe('GET /frequency endpoint', () => {
  it('should return 400 Invalid request with an empty string', () => {
    return supertest(app)
      .get('/frequency')
      .query({ s: '' })
      .expect(400, 'Invalid request');
  });
  it('should return a correct word count', () => {
    const expected = {
      count: 2,
      average: 5,
      highest: 'a',
      'a': 6,
      'b': 4 
    };

    return request(app)
      .get('/frequency')
      .query({s: 'aaBBAAbbaa'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {   
        expect(res.body).to.include.all.keys('count', 'average', 'highest');
        expect(res.body).eql(expected);
      });
  })
});
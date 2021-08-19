'use strict';

require('dotenv').config();

const { server } = require('../src/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

const { db } = require('../src/models/index.js');

describe('API SERVER:', () => {

  beforeAll(async () => {
    await db.sync();
  })

  afterAll(async () => {
    await db.drop();
  })

  it('should respond with a 404 there is no route found', () => {
    return mockRequest.get('/no-route-in-server')
      .then(results => {
        expect(results.status).toEqual(404);
      })
  })

  it('should create a new person', () => {
    mockRequest.post('/person').send({ firstName: 'test', lastName: 'test last'})
    .then(results => {
      expect(results.status).toEqual(201);
    })
  });

  it('should get a single person', () => {
    mockRequest.post('/person').send({ firstName: 'test', lastName: 'test last'})
    .then((results) => {
      mockRequest.get(`/person/${results.id}`)
      .then(response => {
        expect(response.status).toEqual(200);
      });
    })
  });

  it('should get a list of people', () => {
    mockRequest.post('/person').send({ firstName: 'test', lastName: 'test last'})
    .then(() => {
      mockRequest.get('/person')
      .then(response => {
        expect(response.status).toEqual(200);
      });
    })
  });

  it('should update a person', () => {
    mockRequest.post('/person').send({ firstName: 'test', lastName: 'test last'})
    .then((results) => {
      mockRequest.put(`/person/${results.id}`)
        .then(response => {
          expect(response.status).toEqual(202);
      });
    })
  });

  it('should delete a person', () => {
    mockRequest.post('/person').send({ firstName: 'test', lastName: 'test last'})
    .then((results) => {
      mockRequest.delete(`/person/${results.id}`)
      .then(response => {
        expect(response.status).toEqual(204);
      });
    })
  });

})


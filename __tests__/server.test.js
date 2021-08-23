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

  it('should respond with a 404 there is no route found', async () => {
    await mockRequest.get('/no-route-in-server')
      .then(results => {
        expect(results.status).toEqual(404);
      })
  })

  it('should create a new person', async () => {
    await mockRequest.post('/people').send({ firstName: 'test', lastName: 'test last'})
    .then(results => {
      expect(results.status).toEqual(201);
    })
  });

  it('should get a single person', async () => {
    await mockRequest.post('/people').send({ firstName: 'test', lastName: 'test last'})
    .then((results) => {
      mockRequest.get(`/people/${results.id}`)
      .then(response => {
        expect(response.status).toEqual(200);
      });
    })
  });

  it('should get a list of people', async () => {
    await mockRequest.post('/people').send({ firstName: 'test', lastName: 'test last'})
    .then(() => {
      mockRequest.get('/people')
      .then(response => {
        expect(response.status).toEqual(200);
      });
    })
  });

  // it('should update a person', async () => {
  //   await mockRequest.post('/people').send({ firstName: 'test', lastName: 'test last'})
  //   .then((results) => {
  //     mockRequest.put(`/people/${results.id}`).send({ firstName: 'Kali'})
  //       .then(response => {
  //         expect(response.status).toEqual(202);
  //     });
  //   })
  // });

  // it('should delete a person', async () => {
  //   await mockRequest.post('/people').send({ firstName: 'test', lastName: 'test last'})
  //   .then((results) => {
  //     mockRequest.delete(`/people/${results.id}`)
  //     .then(response => {
  //       expect(response.status).toEqual(204);
  //     });
  //   })
  // });

})


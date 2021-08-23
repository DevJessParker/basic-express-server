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
    let results = await mockRequest.get('/no-route-in-server')
    expect(results.status).toEqual(404);
  })

  it('should create a new person', async () => {
    let results = await mockRequest.post('/people').send({ firstName: 'test', lastName: 'test last'})
    expect(results.status).toEqual(201);
    })

  it('should get a single person', async () => {
    let response = await mockRequest.post('/people').send({ firstName: 'test', lastName: 'test last'})
    let results = await mockRequest.get(`/people/${response.body.id}`)
    expect(results.status).toEqual(200);
  });

  it('should get a list of people', async () => {
    await mockRequest.post('/people').send({ firstName: 'test', lastName: 'test last'})
    let response = await mockRequest.get('/people')
    expect(response.status).toEqual(200);
  });
  
  it('should update a person', async () => {
    let results = await mockRequest.post('/people').send({ firstName: 'test', lastName: 'test last'})
    let response = await mockRequest.put(`/people/${results.body.id}`)
    expect(response.status).toEqual(202);
  });
   

  it('should delete a person', async () => {
    let results = await mockRequest.post('/people').send({ firstName: 'test', lastName: 'test last'})
    let response = await mockRequest.delete(`/people/${results.body.id}`)
    expect(response.status).toEqual(204);
  });
})
  


'use strict';

require('dotenv').config();

const { server } = require('../src/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

const { db } = require('../src/models/index.js');

describe('API BOOK SERVER:', () => {

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
  
  it('should create a new book', async () => {
    let results = await mockRequest.post('/book').send({ isbn: 'test', authorFirstName: 'test', authorLastName: 'test last', genre: 'test genre' })
    expect(results.status).toEqual(201);
  })

  it('should get a single book', async () => {
    let results = await mockRequest.post('/book').send({ isbn: 'test', authorFirstName: 'test', authorLastName: 'test last', genre: 'test genre' })
    let response = await mockRequest.get(`/book/${results.body.id}`)
    expect(response.status).toEqual(200);
  });
   
  it('should get a list of book', async () => {
    await mockRequest.post('/book').send({ isbn: 'test', authorFirstName: 'test', authorLastName: 'test last', genre: 'test genre' })
    let response = await mockRequest.get('/book')
    expect(response.status).toEqual(200);
  });

  it('should update a book', async () => {
    let results = await mockRequest.post('/book').send({ isbn: 'test', authorFirstName: 'test', authorLastName: 'test last', genre: 'test genre' })
    let response = await mockRequest.put(`/book/${results.body.id}`)
    expect(response.status).toEqual(202);
  });

  it('should delete a book', async () => {
    let results = await mockRequest.post('/book').send({ isbn: 'test', authorFirstName: 'test', authorLastName: 'test last', genre: 'test genre' })
    let response = await mockRequest.delete(`/book/${results.body.id}`)
    expect(response.status).toEqual(204);
  });
})
 
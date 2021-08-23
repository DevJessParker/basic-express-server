// 'use strict';

// require('dotenv').config();

// const { server } = require('../src/server.js');
// const supertest = require('supertest');
// const mockRequest = supertest(server);

// const { db } = require('../src/models/index.js');

// describe('API BOOK SERVER:', () => {

//   beforeAll(async () => {
//     await db.sync();
//   })

//   afterAll(async () => {
//     await db.drop();
//   })

//   it('should respond with a 404 there is no route found', () => {
//     mockRequest.get('/no-route-in-server')
//       .then(results => {
//         expect(results.status).toEqual(404);
//       })
//   })

//   it('should create a new book', async () => {
//     await mockRequest.post('/book').send({ isbn: 'test', authorFirstName: 'test', authorLastName: 'test last', genre: 'test genre' })
//     .then(results => {
//       expect(results.status).toEqual(201);
//     })
//   });

//   it('should get a single book', async () => {
//     await mockRequest.post('/book').send({ isbn: 'test', authorFirstName: 'test', authorLastName: 'test last', genre: 'test genre' })
//     .then((results) => {
//       mockRequest.get(`/book/${results.id}`)
//       .then(response => {
//         expect(response.status).toEqual(200);
//       });
//     })
//   });

//   it('should get a list of book', async () => {
//     await mockRequest.post('/book').send({ isbn: 'test', authorFirstName: 'test', authorLastName: 'test last', genre: 'test genre' })
//     .then(() => {
//       mockRequest.get('/book')
//       .then(response => {
//         expect(response.status).toEqual(200);
//       });
//     })
//   });

//   it('should update a book', () => {
//     mockRequest.post('/book').send({ isbn: 'test', authorFirstName: 'test', authorLastName: 'test last', genre: 'test genre' })
//     .then((results) => {
//       mockRequest.put(`/book/${results.id}`)
//         .then(response => {
//           expect(response.status).toEqual(202);
//       });
//     })
//   });

//   it('should delete a book', () => {
//     mockRequest.post('/book').send({ isbn: 'test', authorFirstName: 'test', authorLastName: 'test last', genre: 'test genre' })
//     .then((results) => {
//       mockRequest.delete(`/book/${results.id}`)
//       .then(response => {
//         expect(response.status).toEqual(204);
//       });
//     })
//   });

// })

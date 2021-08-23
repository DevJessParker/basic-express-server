'use strict';

const express = require('express');
const { Books } = require('../models/index.js');

const bookRoutes = express.Router();


bookRoutes.get('/book', getBook);
bookRoutes.get('/book/:id', getOneBook)
bookRoutes.post('/book', createBook)
bookRoutes.put('/book/:id', updateBook)
bookRoutes.delete('/book/:id', deleteBook)

async function getBook(req, res) {
  let allBook = await Books.findAll(); 
  res.status(200).json(allBook);
}

async function getOneBook(req, res) {
  const id = parseInt(req.params.id);
  let book = await Books.findOne({ where: { id: id }}) 
  res.status(200).json(book);
}

async function createBook(req, res) {
  try {
    let book = await Books.create(req.body);
    res.status(201).json(book);
  } catch(err) {
    throw new Error(err)
  }
}

async function updateBook(req, res) {
  const id = parseInt(req.params.id);
  const obj = req.body;
  let book = await Books.findOne({ where: { id: id }});
  let updatedBook = await book.update(obj);
  res.status(202).json(updatedBook);
}

async function deleteBook(req, res) {
  let id = parseInt(req.params.id);
  let deletedBook = await Books.destroy({ where: { id: id }});
  res.status(204).json(deletedBook);
}

module.exports = bookRoutes;
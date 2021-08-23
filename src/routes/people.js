'use strict';

const express = require('express');
const { People } = require('../models/index.js');

const peopleRoutes = express.Router();


peopleRoutes.get('/people', getPeople);
peopleRoutes.get('/people/:id', getOnePerson)
peopleRoutes.post('/people', createPerson)
peopleRoutes.put('/people/:id', updatePerson)
peopleRoutes.delete('/people/:id', deletePerson)

async function getPeople(req, res) {
  let allPeople = await People.findAll(); 
  res.status(200).json(allPeople);
}

async function getOnePerson(req, res) {
  const id = parseInt(req.params.id);
  let person = await People.findOne({ where: { id: id }}) 
  res.status(200).json(person);
}

async function createPerson(req, res) {
  try {
    let person = await People.create(req.body);
    res.status(201).json(person);
  } catch(err) {
    throw new Error(err)
  }
}

async function updatePerson(req, res) {
  const id = parseInt(req.params.id);
  const obj = req.body;
  let person = await People.findOne({ where: { id: id }});
  let updatedPerson = await person.update(obj);
  res.status(202).json(updatedPerson);
}

async function deletePerson(req, res) {
  let id = parseInt(req.params.id);
  let deletedPerson = await People.destroy({ where: { id: id }});
  res.status(204).json(deletedPerson);
}

module.exports = peopleRoutes;
const express = require('express');
const internController = require('../controllers/internController.js');

const internRoutes = express.Router();

internRoutes.post('/', internController.post);
internRoutes.get('/', internController.get);
internRoutes.get('/:id', internController.get);
internRoutes.put('/:id', internController.put);
internRoutes.delete('/:id', internController.delete);

module.exports = internRoutes;

const express = require('express');
const applicationController = require('../controllers/applicationController.js');

const applicationRoutes = express.Router();

applicationRoutes.post('/', applicationController.post);
applicationRoutes.get('/', applicationController.get);
applicationRoutes.get('/filter', applicationController.get);

module.exports = applicationRoutes;
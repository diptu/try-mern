const express = require('express');
const seedRouter = express.Router();
const {seedUsers} = require('../controllers/seedUserController');

seedRouter.get('/users', seedUsers)

module.exports = seedRouter;

const express = require('express')
const users = require('../models/users.js')

const { seedUsers } = require('../controllers/seedUsers.js')
const SeedRouter = express.Router()


SeedRouter.get('/users', seedUsers)

module.exports = SeedRouter
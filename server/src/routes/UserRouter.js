
const express = require('express')
const users = require('../models/users.js')

const { getUsers } = require('../controllers/userController.js')
const UserRouter = express.Router()


UserRouter.get('', getUsers)

module.exports = UserRouter
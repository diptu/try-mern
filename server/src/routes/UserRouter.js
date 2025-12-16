
const express = require('express')
const users = require('../models/users.js')

const { getUsers, getUserById } = require('../controllers/userController.js')
const UserRouter = express.Router()


UserRouter.get('', getUsers)
UserRouter.get('/:id', getUserById)


module.exports = UserRouter
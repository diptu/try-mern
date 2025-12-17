
const express = require('express')
const users = require('../models/users.js')

const { getUsers, getUserById, deleteUser } = require('../controllers/userController.js')
const UserRouter = express.Router()


UserRouter.get('', getUsers)
UserRouter.get('/:id', getUserById)
UserRouter.delete('/:id', deleteUser)



module.exports = UserRouter
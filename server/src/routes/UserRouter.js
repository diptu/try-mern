
const express = require('express')
const users = require('../models/users.js')

const { getUsers, getUserById, deleteUser, registerUsers } = require('../controllers/userController.js')
const UserRouter = express.Router()

UserRouter.post('/register', registerUsers)

UserRouter.get('', getUsers)
UserRouter.get('/:id', getUserById)
UserRouter.delete('/:id', deleteUser)



module.exports = UserRouter
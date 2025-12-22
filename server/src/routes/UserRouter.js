
const express = require('express')
const users = require('../models/users.js')
const upload = require('../middlewere/fileUpload.js')


const { getUsers, getUserById, deleteUser, registerUsers, verifyUser } = require('../controllers/userController.js')
const UserRouter = express.Router()

UserRouter.post('/register', upload.single('image'), registerUsers)

UserRouter.get('', getUsers)
UserRouter.get('/verify', verifyUser)

UserRouter.get('/:id', getUserById)
UserRouter.delete('/:id', deleteUser)




module.exports = UserRouter
const express = require('express');
const userRouter = express.Router();
const { getUsers , getUser,deleteUser, processSignup} = require('../controllers/userController');


userRouter.get('/',getUsers);
userRouter.post('/signup',processSignup);

userRouter.get('/:id',getUser);
userRouter.delete('/:id',deleteUser);


module.exports = userRouter;
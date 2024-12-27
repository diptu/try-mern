const createError = require('http-errors')
const { Pagination } = require('react-bootstrap');
const User = require('../model/userModel');
const { successResponse } = require('../helper/ResponseHandaler.js');
const { deleteImage } = require('../helper/DeleteImage.js');
const { sendEmail } = require('../helper/sendEmail.js');

const {JWT_ACTIVATION_KEY, EXPIRES_IN, CLIENT_URL} = require('../secret.js');
const {createJWT} = require('../helper/jsonwebtoken.js');

// const { default: mongoose } = require('mongoose');
const fs = require('fs');

const { findById } = require('../services/getItemById.js');
const { log } = require('console');

const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const searchRegex = new RegExp('.*' + search + '.*', 'i');
    const filter = {
      isAdmin: { $ne: true },

      $or: [
        { name: { $regex: searchRegex } },
        { email: { $regex: searchRegex } },
      ]
    }
    // Not to return password field
    const options = { password: 0 }
    const users = await User.find(filter, options).limit(limit).skip((page - 1) * limit);

    const count = await User.find(filter).countDocuments();
    if (!users) throw createError(404, 'no user found');

    successResponse(res, {
      message: 'Users information returned successfully',
      statusCode: 200,
      payload: {
        users: users,
        Pagination: {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 < Math.ceil(count / limit) ? page + 1 : null,
        }

      }
    });
  } catch (error) {
    next(error);
  }

}


const getUser = async (req, res, next) => {
  try {
    const id = req.params.id || "";
    // return all but password field
    const options = { password: 0}
    const model = User

    const user = await findById(model, id,options);
    successResponse(res, {
      message: 'User information returned successfully',
      statusCode: 200,
      payload: {
        user: user
      }
    });
  } catch (error) {
    next(error);
  }

}

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    // return all but password field
    const options = { password: 0}
    const model = User

    const user = await findById(model, id,options);
    const userImage = user.image;
    
    deleteImage(userImage);

    await model.findByIdAndDelete({
      _id : id, 
      isAdmin : false,
    });
    successResponse(res, {
      message: 'User was removed successfully',
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }

}

const processSignup = async (req, res, next) => {
  try {
   
    const { name, email, password, bio} = req.body;
    const newUser = {
      name, 
      email, 
      password,
      bio}

      const userExists = await User.exists({email : email})
      if(userExists){
        throw createError(409, 'User with this email already exists')
      }

    // generate token
    const token = createJWT( { name, email, password, bio},JWT_ACTIVATION_KEY,EXPIRES_IN);
    // prepare email
    const emailData = {
      email: email,
      subject: 'Account Activation Email',

      html : `<h2>Hello ${name}</h2>
      <p>Please click the link bellow to activate your account</p>
      <p><a href="${CLIENT_URL}/api/users/activate/${token}" target="_blank">click here</a></p>`
    }
    //send email with Nodemailer
    try {
      await sendEmail(emailData);
    } catch (error) {
      throw new Error(error);
      return;
    }
    successResponse(res, {
      message: `Please activate your account from ${email}`,
      statusCode: 200,
      payload:  {
        token,
      }
    });
  } catch (error) {
    next(error);
  }

}
module.exports = { getUsers, getUser, deleteUser, processSignup };
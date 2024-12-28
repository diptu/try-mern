const createError = require('http-errors')
const { Pagination } = require('react-bootstrap');
const User = require('../model/userModel');
const { successResponse } = require('../helper/ResponseHandaler.js');
const { deleteImage } = require('../helper/DeleteImage.js');
const jwt = require('jsonwebtoken');
const sendEmail  = require('../helper/sendEmail.js');

const {JWT_ACTIVATION_KEY, EXPIRES_IN, CLIENT_URL} = require('../secret.js');
const {createJWT} = require('../helper/jsonwebtoken.js');

// const { default: mongoose } = require('mongoose');
const fs = require('fs');

const { findById } = require('../services/getItemById.js');
const { console } = require('inspector');
const { verify } = require('crypto');


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
     <p>To complete your account registration and gain full access to our services, please click on the following link to activate your account:</p>
      <p><a href="${CLIENT_URL}/api/users/verify?token=${token}" target="_blank">${CLIENT_URL}/api/users/verify?token=${token}</a></p>
      <p>If you're unable to click on the link, please copy and paste it into your web browser.

Important: This activation link may expire after ${EXPIRES_IN}.

If you did not request this account activation, please disregard this email.</p>`

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

const activateAccount = async (req, res, next) => {

  try {
  
    const token = req.body.token;
    if (!token) createError(404, 'token not found!');
    const decoded = jwt.verify(token,JWT_ACTIVATION_KEY );
    if (!decoded) createError(401, 'Unable to verify user!');
    console.log(decoded);

    // create a new user
    await User.create(decoded);
    successResponse(res, {
      message: `user created successfully`,
      statusCode: 201,
      payload:  {
        token,
      }
    });
  } catch (error) {
    next(createError(404, 'Invalid token : '+error.message));
  }

}

module.exports = { getUsers, getUser, deleteUser, processSignup, activateAccount, };
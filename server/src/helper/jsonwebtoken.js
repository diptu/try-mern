const createError = require('http-errors')
const jwt = require('jsonwebtoken');
const createJWT = (payload='dummy', secretKey='user', expiresIn='1h') => {
  try {
    const token = jwt.sign({payload}, secretKey, { expiresIn: expiresIn });

      return token;

  } catch (error) {
    throw new Error('Fail to generate jwt token: ' + error);
  }
}
module.exports = {createJWT};
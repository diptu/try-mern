const createError = require('http-errors');
const users = require('../models/users.js')

const getUsers = (req, res, next) => {
    try {
        res.status(200).json({
            'message': 'Users retured successfully',
            users
        })
    } catch (error) {
        next(error)
    }
}
module.exports = { getUsers }
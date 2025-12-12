const createError = require('http-errors');
const UserModel = require('../models/UserModel.js')

const getUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find({}, { 'phone_number': 0, 'is_admin': 0 });// exclue column phone_number,is_active
        await res.status(200).json({
            'message': 'Users retured successfully',
            users
        })
    } catch (error) {
        next(error)
    }
}
module.exports = { getUsers }
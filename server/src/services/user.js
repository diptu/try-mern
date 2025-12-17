const UserModel = require("../models/UserModel");
const createError = require("http-errors");
const mongoose = require("mongoose");

const findUserById = async (id) => {
    try {
        const user = await UserModel.findById(id, {
            password_hash: 0,
        });

        if (!user) {
            throw createError(404, "User not found");
        }

        return user;
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            throw createError(400, "Invalid user id");
        }
        throw error;
    }
};

module.exports = { findUserById };

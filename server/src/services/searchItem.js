const createError = require("http-errors");
const mongoose = require("mongoose");

const findItemById = async (id, projection = {}, Model) => {
    try {
        const item = await Model.findById(id, projection);
        if (!item) throw createError(404, `${Model.modelName} not found`);
        return item;
    } catch (err) {
        if (err instanceof mongoose.Error.CastError) {
            throw createError(400, `Invalid ${Model.modelName} id`);
        }
        throw err;
    }
};

module.exports = { findItemById };

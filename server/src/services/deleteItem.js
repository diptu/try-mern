const createError = require("http-errors");
const mongoose = require("mongoose");
const fs = require("fs/promises");

/**
 * Safely delete file if exists
 */
const deleteFileIfExists = async (filePath) => {
    if (!filePath) return;

    try {
        await fs.unlink(filePath);
    } catch (err) {
        // Ignore missing file errors
        if (err.code !== "ENOENT") {
            throw err;
        }
    }
};

/**
 * Delete item by ID (User-aware: removes image before delete)
 */
const deleteItemById = async (id, projection = {}, Model) => {
    try {
        const item = await Model.findById(id, projection);
        if (!item) throw createError(404, `${Model.modelName} not found`);
        // ─────────────────────────────
        // cleanup
        // ─────────────────────────────
        if (item.image || item.avatar) {
            await deleteFileIfExists(item.image || item.avatar);
        }

        const result = await Model.deleteOne({ _id: item._id });
        if (!result.deletedCount) {
            throw createError(500, "Delete operation failed");
        }

        return true;
    } catch (err) {
        if (err instanceof mongoose.Error.CastError) {
            throw createError(400, `Invalid ${Model.modelName} id`);
        }
        throw err;
    }
};

module.exports = { deleteItemById };

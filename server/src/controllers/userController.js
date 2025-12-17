const createError = require("http-errors");
const User = require("../models/UserModel");
const { DEFAULT_PAGE_SIZE } = require("../secret");
const { successResponse } = require("./ResponseController");
const { findItemById } = require("../services/searchItem");
const { deleteItemById } = require("../services/deleteItem");

/**
 * Escape string for safe regex usage
 */
const escapeRegex = (str = "") =>
    str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * GET /users
 */
const getUsers = async (req, res, next) => {
    try {
        const search = String(req.query.search || "").trim();
        const page = Math.max(Number(req.query.page) || 1, 1);
        const limit = Math.min(
            Math.max(Number(req.query.limit) || DEFAULT_PAGE_SIZE, 1),
            5
        );

        const filter = { is_admin: { $ne: true } };

        if (search) {
            const regex = new RegExp(escapeRegex(search), "i");
            filter.$or = [{ first_name: regex }, { last_name: regex }];
        }

        const skip = (page - 1) * limit;

        const [users, total] = await Promise.all([
            User.find(filter).skip(skip).limit(limit).lean(),
            User.countDocuments(filter),
        ]);

        if (!users.length) throw createError(404, "No users found");

        return successResponse(res, {
            status: 200,
            message: "Users returned successfully",
            payload: {
                users,
                pagination: {
                    total_records: total,
                    total_pages: Math.ceil(total / limit),
                    current_page: page,
                    prev_page: page > 1 ? page - 1 : null,
                    next_page: page * limit < total ? page + 1 : null,
                    page_size: limit,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

/**
 * GET /users/:id
 */
const getUserById = async (req, res, next) => {
    try {
        const user = await findItemById(
            req.params.id,
            { password_hash: 0 },
            User
        );

        return successResponse(res, {
            status: 200,
            message: "User returned successfully",
            payload: { user },
        });
    } catch (err) {
        next(err);
    }
};

/**
 * DELETE /users/:id
 */
const deleteUser = async (req, res, next) => {
    try {
        await deleteItemById(req.params.id, { is_admin: 0 }, User);

        return successResponse(res, {
            status: 200,
            message: `User:${req.params.id} deleted successfully`,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { getUsers, getUserById, deleteUser };

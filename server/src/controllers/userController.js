const createError = require("http-errors");
const UserModel = require("../models/UserModel");
const { DEFAULT_PAGE_SIZE } = require("../secret");
const { successResponse } = require("./ResponseController");
const { findUserById } = require("../services/user");


const mongoose = require("mongoose");

/**
 * Escape user input for safe regex usage
 */
const escapeRegex = (value = "") =>
    value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getUsers = async (req, res, next) => {
    try {
        // ─────────────────────────────
        // 1. Parse & validate query params
        // ─────────────────────────────
        const search = String(req.query.search || "").trim();
        const page = Math.max(Number(req.query.page) || 1, 1);
        const limit = Math.min(
            Math.max(Number(req.query.limit) || DEFAULT_PAGE_SIZE, 1),
            5
        );

        // ─────────────────────────────
        // 2. Build search filter
        // ─────────────────────────────
        const filter = {
            is_admin: { $ne: true },
        };

        if (search) {
            const searchRegExp = new RegExp(escapeRegex(search), "i");
            filter.$or = [
                { first_name: searchRegExp },
                { last_name: searchRegExp },
            ];
        }

        // ─────────────────────────────
        // 3. Query database (parallel)
        // ─────────────────────────────
        const skip = (page - 1) * limit;

        const [users, totalUsers] = await Promise.all([
            UserModel.find(filter)
                .skip(skip)
                .limit(limit)
                .lean()
                .exec(),
            UserModel.countDocuments(filter),
        ]);

        if (!users.length) {
            throw createError(404, "No users found");
        }

        // ─────────────────────────────
        // 4. Pagination metadata
        // ─────────────────────────────
        const totalPages = Math.ceil(totalUsers / limit);

        const pagination = {
            total_records: totalUsers,
            total_pages: totalPages,
            current_page: page,
            prev_page: page > 1 ? page - 1 : null,
            next_page: page < totalPages ? page + 1 : null,
            page_size: limit,
        };

        // ─────────────────────────────
        // 5. Response
        // ─────────────────────────────
        return successResponse(res, {
            status: 200,
            message: "Users returned successfully",
            payload: { users, pagination },
        });
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {

    try {
        const id = String(req.params.id || "").trim();
        const option = { 'password_hash': 0 }

        const user = await findUserById(id)
        return successResponse(res, {
            status: 200,
            message: "User returned successfully",
            payload: { user },
        });
    } catch (error) {
        if (error instanceof mongoose.Error) {
            next(createError(400, 'Invalid user id'))
        }
        next(error)
    }

}
module.exports = { getUsers, getUserById };

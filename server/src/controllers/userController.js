const createError = require("http-errors");
const User = require("../models/UserModel");
const { DEFAULT_PAGE_SIZE, JWT_SECRET, expiresIn, APP_NAME, CLIENT_URL } = require("../secret");
const { successResponse } = require("./ResponseController");
const { findItemById } = require("../services/searchItem");
const { deleteItemById } = require("../services/deleteItem");
const UserModel = require("../models/UserModel");
const { createToken, verifyToken } = require('../utils/jwtUtils')
const sendEmail = require('../utils/sentEmail')


const bcrypt = require('bcryptjs');

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

/**
 * POST /users/register
 */
const registerUsers = async (req, res, next) => {
    try {
        const { first_name, last_name, email, password, phone_number, address } = req.body;

        const image = req.file
            ? req.file.path.replace(/\\/g, '/') // windows-safe
            : undefined;

        // Required fields
        if (!last_name || !email || !password) {
            throw createError(400, "Last name, email, and password are required");
        }

        // Check if email already exists
        const isExist = await UserModel.exists({ email });
        if (isExist) {
            throw createError(409, `User with email ${email} already exists`);
        }

        // Hash password
        const password_hash = await bcrypt.hash(password, 12);

        // Create user (NOT verified yet)
        const user = await UserModel.create({
            first_name: first_name?.trim() || null,
            last_name,
            email,
            password_hash,
            phone_number,
            address,
            image,
            is_verified: false,
        });

        // Create activation token (SAFE payload)
        const token = createToken(
            { userId: user._id, email },
            JWT_SECRET,
            expiresIn
        );

        const greetingName = first_name?.trim() || last_name;

        // Activation email
        const emailInfo = {
            to: email,
            subject: `Activate Your ${APP_NAME} Account`,
            html: `
        <p>Dear ${greetingName},</p>

        <p>
          Welcome to <strong>${APP_NAME}</strong>. We are pleased to have you on board.
        </p>

        <p>
          To complete your registration, please click the button below:
        </p>

        <p style="margin: 20px 0;">
          <a
            href="${CLIENT_URL}/api/users/verify?token=${token}"
            target="_blank"
            style="
              background-color: #2563eb;
              color: #ffffff;
              padding: 10px 16px;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 600;
            "
          >
            Activate Account
          </a>
        </p>

        <p>
          If the button does not work, copy and paste this link:
        </p>

        <p>${CLIENT_URL}/api/users/verify?token=${token}</p>

        <p>
          If you did not create an account, you may safely ignore this email.
        </p>

        <br />

        <p>
          Kind regards,<br />
          <strong>${APP_NAME} Team</strong>
        </p>
      `,
        };

        await sendEmail(emailInfo);

        return res.status(201).json({
            success: true,
            message:
                "Registration successful. Please check your email to activate your account.",
        });

    } catch (error) {
        next(error);
    }
};

/**
 * GET /users/verify
 */
const verifyUser = async (req, res, next) => {
    try {
        const token = String(req.query.token || '').trim();

        if (!token) {
            throw createError(400, 'Activation token is required');
        }

        let decoded;
        try {
            decoded = verifyToken(token, JWT_SECRET);
        } catch (err) {
            if (err.message === 'TOKEN_EXPIRED') {
                throw createError(401, 'Activation link has expired');
            }
            if (err.message === 'INVALID_TOKEN') {
                throw createError(401, 'Invalid activation token');
            }
            throw err;
        }

        const { userId, email } = decoded;

        if (!userId || !email) {
            throw createError(400, 'Invalid activation payload');
        }

        const user = await UserModel.findOne({ _id: userId, email });

        if (!user) {
            throw createError(404, 'User not found');
        }

        // ✅ Already verified
        if (user.is_verified === true) {
            return successResponse(res, {
                status: 200,
                message: 'Account already activated',
            });
        }

        // ✅ Activate account
        user.is_verified = true;
        await user.save({ validateBeforeSave: false });

        return successResponse(res, {
            status: 200,
            message: 'Account activated successfully',
        });

    } catch (error) {
        next(error);
    }
};



module.exports = { getUsers, getUserById, deleteUser, registerUsers, verifyUser };

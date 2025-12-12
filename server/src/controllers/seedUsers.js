// controllers/seedUsers.js
const createError = require("http-errors");
const seedData = require("../models/users.js"); // dummy users array
const UserModel = require("../models/UserModel.js");
const { normalizeLoyaltyTier } = require("../utils/userValidation.js");

const seedUsers = async (req, res, next) => {
    try {
        if (process.env.NODE_ENV === "production") {
            return next(createError(403, "Seeding is disabled in production"));
        }

        // Clear existing users
        await UserModel.deleteMany({});
        console.log("🗑️ Existing users removed");

        const insertedUsers = [];
        const skippedUsers = [];

        for (const u of seedData) {
            try {
                // Prepare user object
                const userObj = {
                    ...u,
                    loyalty_tier: normalizeLoyaltyTier(u.loyalty_tier),
                    password_hash: u.password_hash, // triggers validation + hashing in model
                };

                const user = new UserModel(userObj);
                await user.save();
                insertedUsers.push(user);
            } catch (err) {
                skippedUsers.push({
                    email: u.email,
                    reason: err.errors?.password_hash?.message || err.message,
                });
                console.warn(`⚠️ Skipping user ${u.email}: ${err.message}`);
            }
        }

        res.status(201).json({
            success: true,
            inserted: insertedUsers.length,
            skipped: skippedUsers.length,
            users: insertedUsers,
            skipped_users: skippedUsers,
        });
    } catch (err) {
        console.error(err);
        return next(createError(500, "Seeding failed"));
    }
};

module.exports = { seedUsers };

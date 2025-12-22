// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { DEFAULT_IMG_PATH } = require("../secret.js");
const {
    formatName,
    normalizeLoyaltyTier,
    validateAndHashPassword,
    validateEmail,
    ALLOWED_TIERS,
} = require("../utils/userValidation.js");

// ----------------------
// Schema
// ----------------------
const UserSchema = new mongoose.Schema(
    {
        // --- Names ---
        first_name: {
            type: String,
            trim: true,
            maxlength: 30,
            set: formatName,
        },

        last_name: {
            type: String,
            required: [true, "Last name required"],
            trim: true,
            maxlength: 30,
            set: formatName,
        },

        // --- Contact ---
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            set: validateEmail,
            index: true,
        },

        phone_number: { type: String, trim: true },

        // --- Security ---
        password_hash: {
            type: String,
            required: [true, "Password is required"],
            select: false,
            set: validateAndHashPassword,
        },

        // --- Profile ---
        image: { type: String, default: DEFAULT_IMG_PATH },

        date_joined: { type: Date, default: Date.now },

        loyalty_tier: {
            type: String,
            enum: ALLOWED_TIERS,
            default: "BRONZE",
            uppercase: true,
            set: normalizeLoyaltyTier,
        },

        // --- Relations ---
        address_id: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },

        // --- Flags ---
        is_active: { type: Boolean, default: true },
        is_admin: { type: Boolean, default: false },
        is_banned: { type: Boolean, default: false },
        is_varified: { type: Boolean, default: false },

    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// ----------------------
// Methods
// ----------------------
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password_hash);
};

// ----------------------
const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;

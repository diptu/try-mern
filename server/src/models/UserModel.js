// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { DEFAULT_IMG_PATH } = require("../secret.js");

const UserSchema = new mongoose.Schema(
    {
        first_name: { type: String, trim: true, maxlength: 30 },

        last_name: {
            type: String,
            required: [true, "Last name required"],
            trim: true,
            maxlength: [30, "Last name must be 30 chars or less"],
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            validate: {
                validator: (v) =>
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v),
                message: "Please enter a valid email address",
            },
            index: true,
        },

        phone_number: { type: String, trim: true },

        password_hash: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters"],
            select: false, // prevent return in queries
        },

        image: { type: String, default: DEFAULT_IMG_PATH },

        address_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address",
            // required: true,
        },

        is_active: { type: Boolean, default: true },
        is_admin: { type: Boolean, default: false },
        is_banned: { type: Boolean, default: false },
    },
    { timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password_hash")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password_hash = await bcrypt.hash(this.password_hash, salt);
    next();
});

// Compare password
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password_hash);
};

module.exports = mongoose.model("User", UserSchema);

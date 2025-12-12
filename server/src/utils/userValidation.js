//utils/userValidation.js
const bcrypt = require("bcryptjs");

// ----------------------
// Password
// ----------------------
const STRONG_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

function validateAndHashPassword(password) {
    if (!STRONG_PASSWORD_REGEX.test(password)) {
        throw new Error(
            "Password must be at least 8 chars and include uppercase, lowercase, number, and special char"
        );
    }
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

// ----------------------
// Loyalty tier
// ----------------------
const ALLOWED_TIERS = ["BRONZE", "SILVER", "GOLD", "DIAMOND", "PLATINUM"];
const DEFAULT_TIER = "BRONZE";

function normalizeLoyaltyTier(tier) {
    if (!tier || typeof tier !== "string") return DEFAULT_TIER;
    const normalized = tier.trim().toUpperCase();
    return ALLOWED_TIERS.includes(normalized) ? normalized : DEFAULT_TIER;
}

// ----------------------
// Name formatting
// ----------------------
function formatName(value) {
    if (!value || typeof value !== "string") return value;
    const clean = value.trim().toLowerCase();
    return clean.charAt(0).toUpperCase() + clean.slice(1);
}

// ----------------------
// Email validation
// ----------------------
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validateEmail(email) {
    if (!email || typeof email !== "string") {
        throw new Error("Email is required");
    }
    if (!EMAIL_REGEX.test(email)) {
        throw new Error("Please enter a valid email address");
    }
    return email.toLowerCase().trim();
}

// ----------------------
module.exports = {
    validateAndHashPassword,
    normalizeLoyaltyTier,
    formatName,
    validateEmail,
    ALLOWED_TIERS,
};

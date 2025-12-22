// utils/jwtUtils.js
const jwt = require("jsonwebtoken");

/**
 * Validate required value
 */
const assert = (condition, message) => {
    if (!condition) {
        throw new Error(message);
    }
};

/**
 * Create a JWT token
 * @param {Object} payload
 * @param {string} secretKey
 * @param {string} [expiresIn="10m"]
 * @returns {string}
 */
const createToken = (payload, secretKey, expiresIn = "10m") => {
    assert(
        payload && typeof payload === "object" && !Array.isArray(payload),
        "JWT payload must be a valid object"
    );

    assert(secretKey, "JWT secret key is required");

    return jwt.sign(payload, secretKey, { expiresIn });
};

/**
 * Verify JWT token and return decoded payload
 * @param {string} token
 * @param {string} secretKey
 * @returns {Object}
 */
const verifyToken = (token, secretKey) => {
    assert(typeof token === "string", "JWT token is required");
    assert(secretKey, "JWT secret key is required");

    try {
        const decoded = jwt.verify(token, secretKey);

        assert(decoded && typeof decoded === "object", "INVALID_TOKEN");
        return decoded;
    } catch (error) {
        switch (error.name) {
            case "TokenExpiredError":
                throw new Error("TOKEN_EXPIRED");
            case "JsonWebTokenError":
                throw new Error("INVALID_TOKEN");
            default:
                throw error;
        }
    }
};

module.exports = {
    createToken,
    verifyToken,
};

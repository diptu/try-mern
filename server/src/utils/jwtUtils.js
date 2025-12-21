// utils/jwtUtils.js
const jwt = require('jsonwebtoken');

const tokenCreate = (
    payload = {},
    secretKey,
    expiresIn = '10m'
) => {
    if (typeof payload !== 'object' || Object.keys(payload).length === 0) {
        throw new Error('Payload must be a non-empty object');
    }

    if (!secretKey) {
        throw new Error('JWT secret key is required');
    }

    return jwt.sign(payload, secretKey, { expiresIn });
};

module.exports = { tokenCreate };

require('dotenv').config();

const SERVER_PORT = process.env.SERVER_PORT || 3001;

module.exports = {
    SERVER_PORT,
}
// src/config/upload.config.js
const path = require('path');

const MB = 1024 * 1024;

module.exports = {
    DEFAULT_IMG_PATH: path.resolve('src/img/users/user.png'),

    UPLOAD_DIR: path.resolve('src/public/img/users'),

    MAX_FILE_SIZE: 10 * MB,

    ALLOWED_FILE_TYPES: ['jpg', 'jpeg', 'png']
};

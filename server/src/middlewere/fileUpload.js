// middleware/fileupload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const createError = require('http-errors');

const {
    UPLOAD_DIR,
    MAX_FILE_SIZE,
    ALLOWED_FILE_TYPES
} = require('../config/upload.config');

/**
 * Extension → MIME mapping
 * (Derived from allowed extensions, not duplicated logic)
 */
const MIME_TYPE_MAP = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
    gif: 'image/gif'
};

const ALLOWED_MIME_TYPES = ALLOWED_FILE_TYPES
    .map(ext => MIME_TYPE_MAP[ext])
    .filter(Boolean);

/**
 * Ensure upload directory exists
 */
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

/**
 * Multer storage
 */
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, UPLOAD_DIR);
    },

    filename(req, file, cb) {
        const ext = path.extname(file.originalname).toLowerCase();

        if (!ext) {
            return cb(createError(400, 'File must have a valid extension'));
        }

        const baseName = path
            .basename(file.originalname, ext)
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')   // normalize
            .replace(/^-+|-+$/g, '')      // trim dashes
            || 'image';                   // fallback

        const uniqueId = crypto.randomBytes(6).toString('hex');

        cb(null, `${baseName}-${uniqueId}${ext}`);
    }
});

/**
 * File validation
 */
const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).slice(1).toLowerCase();

    if (
        !ALLOWED_FILE_TYPES.includes(ext) ||
        !ALLOWED_MIME_TYPES.includes(file.mimetype)
    ) {
        return cb(
            createError(
                400,
                `Invalid file type. Allowed types: ${ALLOWED_FILE_TYPES.join(', ')}`
            ),
            false
        );
    }

    cb(null, true);
};

/**
 * Export configured multer instance
 */
const upload = multer({
    storage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter
});

module.exports = upload
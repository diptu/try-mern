const express = require('express');

const productRoute = express.Router();

// /api/products
productRoute.get('/', getProducts);

module.exports = productRoute;
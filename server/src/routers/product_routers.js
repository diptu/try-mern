const products = require('../model/product_models')
const express = require('express');
const createError = require('http-errors')
const productRoute = express.Router();

// /api/products
const getProducts = (req, res, next) => {
    try {
    res.statusCode = 200;

    res.send(
        {
            msg : 'Show  all products',
            data: products,
        }
    );
        
    } catch (error) {
        next(error);
        
    }

};

module.exports = getProducts;
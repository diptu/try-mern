const products = require('../model/product_models');
const data = require('../data');

const seedProduct = async(req,res,next)=>{
try {
    // deliting all existing products
    await products.drop({});
    // inserting new products
    const newProducts = await products.insertMany(data.products);

    // sussess response
    return res.status(201).json(newProducts);

} catch (error) {
    next(error);
}
}
module.exports = {
    seedProduct,
};

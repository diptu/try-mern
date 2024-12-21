const {Schema, Model} = require('mongoose');
const { DEFAULT_PRODUCT_IMAGE } = require('../secret');

productSchema = new Schema({
    name : {
        type : String,
        unique : true,
        required : [true,'Product Name Required'],
        trim : true,
        lowercase : true,
        maxLength : [50, 'User Name Can\'t be more than 50 characters'],
    },
    description : {
        type : String,
        lowercase : true,
    },
    photo : {
        type : String,
        default : DEFAULT_PRODUCT_IMAGE,
    },
    brand : {
        type : String,
        unique : true,
        required : [true,'Brand Name Required'],
        trim : true,
        lowercase : true,
        maxLength : [50, 'Brand Name Can\'t be more than 50 characters,  got {VALUE}'],
    },
    price : {
        type : Number,
        required : [true,'Product price Required'],
    },
    discountRate : {
        type : Number,
        default : 0.0,
    },
   

},  {timestamps : true});

const products = new Model('products',productSchema);
module.exports ={
    products,
}
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Product title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        trim: true
    },
    brand: {
        type: String,
        required: [true, 'Brand name is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'price is required'],
        min: [0, 'Price cannot be negative']
    },
    discountPrice: {
        type: Number,
        validate: {
            validator: function (value) {
                // 'this' refers to the variant document; ensures discount is lower than base price
                return value < this.price;
            },
            message: 'Discount price ({VALUE}) must be lower than the original price'
        }
    },
    // Media arrays
    mages: {
        type: [{
            url: { type: String, required: true },
            altText: { type: String, trim: true }
        }],
        required: false
    },

    stock: {
        type: Number,
        required: [true, 'Stock quantity is required'],
        min: [0, 'Stock cannot be negative'],
        default: 0
    }

},
    {
        timestamps: true // Automatically creates 'createdAt' and 'updatedAt' fields
    });

const Product = mongoose.model('Product', ProductSchema);

export default Product;
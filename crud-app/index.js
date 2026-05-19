import 'dotenv/config';
import express from 'express'
import mongoose from 'mongoose';

import ProductModel from './model/product.model.js';
const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected!'));

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.post('/api/products', async (req, res) => {
    try {

        const newProduct = await ProductModel.create(req.body);

        res.status(201).json(newProduct);

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

app.get('/api/products', async (req, res) => {
    try {

        const products = await ProductModel.find({});

        if (products.length === 0)
            res.status(404).json({ 'msg': `No product not found` });
        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

app.get('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const newProduct = await ProductModel.findById(id);

        res.status(200).json(newProduct);

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});


app.put('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const product = await ProductModel.updateOne({ _id: id }, req.body);

        if (!product)
            res.status(404).json({ 'msg': `product not found` });
        res.status(200).json({ 'msg': `product with id: ${id} updated successfully.` });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});


app.delete('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const product = await ProductModel.deleteOne({ _id: id });

        if (!product)
            res.status(404).json({ 'msg': `product not found` });
        res.status(200).json({ 'msg': `product with id: ${id} deleted successfully.` });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});
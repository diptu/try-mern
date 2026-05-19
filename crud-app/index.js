import 'dotenv/config';
import productRoute from "./routes/product.route.js";
import express from 'express'
import mongoose from 'mongoose';



// middleweres
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected!'));

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})

// routes

app.use("/api/products", productRoute);
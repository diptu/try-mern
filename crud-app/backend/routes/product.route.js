import express from "express";
import Product from "../model/product.model.js";
const router = express.Router();
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';


router.get('/', getProducts);
router.get("/:id", getProduct);

router.post("/", createProduct);

// update a product
router.put("/:id", updateProduct);

// delete a product
router.delete("/:id", deleteProduct);




export default router;
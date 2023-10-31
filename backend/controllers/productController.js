import { Product } from "../models/productModel.js";

export const createProduct = async(req,res,next) => {
    const {name, category, price, description, isFeatured, qtyInStock} = req.body
    console.log(req.body)
    const product = new Product({
        name,
        qtyInStock,
        category,
        price,
        description,
        isFeatured
    })
    console.log("running ")
    try {
        const savedProduct = await product.save()
        console.log(savedProduct)
        res.status(201).json(savedProduct)
    } catch (error) {
        next(error) 
    }
}
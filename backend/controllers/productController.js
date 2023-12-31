import { Product } from "../models/productModel.js";

export const createProduct = async(req,res,next) => {
    const {name, category, price, description, isFeatured, qtyInStock, img} = req.body
    console.log(req.body)
    const product = new Product({
        name,
        qtyInStock,
        category,
        price,
        description,
        isFeatured,
        img
    })
    try {
        const savedProduct = await product.save()
        console.log(savedProduct)
        res.status(201).json(savedProduct)
    } catch (error) {
        next(error) 
    }
}

export const getAllProducts = async(req,res,next) => {
    try {
        const data = await Product.find({})
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}
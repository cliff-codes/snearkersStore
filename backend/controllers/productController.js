import { Product } from "../models/productModel";

export const createProduct = async(req,res,next) => {
    const {name, category, price, description, isFeatured, qtyInStock} = req.body

    const product = new Product({
        name,
        qtyInStock,
        category,
        price,
        description,
        isFeatured
    })
    try {
        await product.save()
        res.status(201).json(product)
    } catch (error) {
        next(error)
    }
}
import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    rating : {
        count : Number,
        rate: Number
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    qtyInStock: {
        type: Number,
        required: true
    },
})
export const Product = mongoose.model("Product", productSchema)
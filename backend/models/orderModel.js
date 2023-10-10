import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    products : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }]
})

export const Order = mongoose.model("Order", orderSchema)
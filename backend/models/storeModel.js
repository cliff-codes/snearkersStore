import mongoose from "mongoose"

const storeSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        }
    ],
    catalog: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    owner: {
        type: String,
        required: true
    },
    coverImg: String
},{timestamps: true})

export const Store = mongoose.Model("Store", storeSchema)
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    orderedProducts : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
})
export const Customer = mongoose.model("Customer", customerSchema)



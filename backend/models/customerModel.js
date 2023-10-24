import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { errorHandler } from "../utils/Error.js"

const customerSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    profilePic : {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAkjktNk_waKZ6A064JikKQRYLxoKPNIUR_g&usqp=CAU"
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
    ],
    stores: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Store"
        }
    ]
})


customerSchema.statics.findByCredentials = async(email, password, next) => {
    const customer = await Customer.findOne({email})
    if(!customer){
        throw new Error("Unable to login")
    }

    const isMatch = bcrypt.compareSync(password, customer.password)
    if(!isMatch){
        console.log("wrong password")
        return next(errorHandler(404, "invalid credentials"))
    }
    return customer
}

export const Customer = mongoose.model("Customer", customerSchema)



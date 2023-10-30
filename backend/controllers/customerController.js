import { Customer } from "../models/customerModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { errorHandler } from "../utils/Error.js"
dotenv.config()

export const signUpCustomer = async(req, res) => {
    const {name, email, password} = req.body
    const hashedPassword = bcrypt.hashSync(password,10)
    try {
        const newCustomer = new Customer({name, email, password: hashedPassword})
        await newCustomer.save()
        const token = jwt.sign({_id: newCustomer._id},process.env.JWT_SECRET)
        const expiryDate = new Date(Date.now() + 3600000)
        const {password, ...rest} = newCustomer._doc
        res.cookie('access_token',token, {httpOnly: true, expires: expiryDate}).status(200).json(rest)
    } catch (error) {
        res.status(500).json(error)
    }
}  

export const loginCustomer = async(req, res, next) => {
    const {email, password} = req.body
    try {
        const customer = await Customer.findByCredentials(email,password)
        if(!customer) {
            return next(errorHandler(403, "invalid credentials"))
        }
        const token = jwt.sign({_id: customer._id},process.env.JWT_SECRET)

        const {password : hashedPassword, ...rest} = customer._doc
        const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours in milliseconds
        res.cookie('access_token',token, {httpOnly: true, expires: expiryDate}).status(200).json(rest)
    } catch (error) {
        next()
    }
}

export const deleteCustomer = async (req, res) => {
    const customerId = req.customer._id;
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(customerId);
        
        if (!deletedCustomer) {
            throw new Error("This customer does not exist");
        }
        console.log(deletedCustomer);
        res.clearCookie('access_token').status(200).json("User Deleted successfully");
    } catch (error) {
        res.clearCookie('access_token').status(500).json({ error: error.message });
    }
};


export const logoutCustomer = async(req,res) => {
    res.clearCookie('access_token').status(200).json ("Signout success")
}
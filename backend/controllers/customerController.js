import { Customer } from "../models/customerModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const signUpCustomer = async(req, res) => {
    const {name, email, password} = req.body
    try {
        const hashedPassword = bcrypt.hashSync(password,10)
        const newCustomer = new Customer({name, email, password: hashedPassword})
        await newCustomer.save()
        res.status(201).json(newCustomer)
    } catch (error) {
        console.log(error)
    }
}  

export const loginCustomer = async(req, res) => {
    const {email, password} = req.body
    try {
        const customer = await Customer.findByCredentials(email,password)
        const token = jwt.sign({_id: customer._id},process.env.JWT_SECRET)

        const {password : hashedPassword, ...rest} = customer._doc
        const expiryDate = new Date(Date.now() + 3600000)
        res.cookie('access_token',token, {httpOnly: true, expires: expiryDate}).status(200).json(rest)
    } catch (error) {
        res.status(500).json("login failure")
    }
}
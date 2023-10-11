import { Customer } from "../models/customerModel.js"
import bcrypt from "bcrypt"

export const signUpCustomer = async(req,res) => {
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


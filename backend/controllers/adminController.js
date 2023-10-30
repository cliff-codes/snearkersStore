import { Admin } from "../models/adminModel.js"
import { errorHandler } from "../utils/Error.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const createAdmin = async(req,res, next) => {
    try {
        const admin = new Admin({
            email: "tryadmin@gmail.com",
            password: "adminpassword"
        })
        await admin.save()
        const token = jwt.sign({_id: admin._id},process.env.JWT_SECRET)
        const expiryDate = new Date(Date.now() + 3600000)
        
        res.cookie('access_token',token, {httpOnly: true, expires: expiryDate}).status(200).json(admin )

    } catch (error) {
        next(error) 
    }
}

export const updateAdmin = async(req,res,next) => {
    try {
        console.log(req.admin._id)
        if(req.body.password){
            req.body.password = bcrypt.hashSync(req.body.password, 10)
        }
    
        const updatedAdmin = await Admin.findByIdAndUpdate(req.admin._id, {
            $set: {
                email: req.body.email,
                password: req.body.password
            }
        },{new: true})
    
        const {password, ...rest} = updatedAdmin._doc
        await res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

export const adminLogin = async(req,res,next) => {
    console.log('working')
    const {email, password} = req.body

    try {
        const admin = await Admin.findOne({email})

        if(!admin){
            errorHandler(401, "Invalid credentials")
        }

        const isMatch = bcrypt.compareSync(password, admin.password)

        if(!isMatch){
            errorHandler(401, "Invalid credentials")
        }

        const token = jwt.sign({_id: admin._id},process.env.JWT_SECRET)
        const expiryDate = new Date(Date.now() + 3600000)
        
        res.cookie('access_token',token, {httpOnly: true, expires: expiryDate}).status(200).json(admin )

    } catch (error) {
        next(error)
    }
}
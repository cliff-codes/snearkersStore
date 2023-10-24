import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { errorHandler } from "./Error.js"
dotenv.config()

export const verifyCustomer = (req,res,next) => {
    console.log('verifying user..')
    console.log(req.cookies)
    const token = req.cookies.access_token
    console.log(token, "token not found")
    if(!token) {
       return next(errorHandler(401, "Access denied"))
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, customer) => {
        if(err) next(403, "Token is not valid")
        req.customer = customer
        next()
    }) 
}

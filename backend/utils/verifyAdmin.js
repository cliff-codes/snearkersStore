import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { errorHandler } from "./Error.js"
dotenv.config()

export const verifyAdmin = (req,res,next) => {
    // console.log('verifying admin..')
    // console.log(req.cookies)
    const token = req.cookies.access_token
    console.log(token, "token not found")
    if(!token) {
       return next(errorHandler(401, "Access denied"))
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, admin) => {
        if(err) next(403, "Token is not valid")
        req.admin = admin
        next()
    }) 
}

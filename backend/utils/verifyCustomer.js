import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const verifyCustomer = (req,res,next) => {
    console.log('verifying user..')
    const token = req.cookies.access_token
    console.log(token)
    if(!token) {
       res.status(500).json({message: "Access Denied"})
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, customer) => {
        if(err) throw new Error("Token is invalid")
        req.customer = customer
        next()
    }) 
}

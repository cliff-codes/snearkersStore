import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import { router as CustomerRouter } from "./routes/customerRoutes.js"
import { router as storeRouter } from "./routes/storeRoutes.js"
import cookieParser from "cookie-parser"
import cors from "cors"


dotenv.config()
const app = express()

//middlewares
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));
app.use('/api/v1',CustomerRouter)
app.use('/api/v1', storeRouter)

//error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server error'
    return res.status(statusCode).json({
        sucess: false,
        message,
        statusCode
    })
})

const url = `mongodb+srv://simplecodes2580:${process.env.MONGOOSE_PASSWORD}@cluster0.ax3s1ku.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url).then(() => {
    console.log('Connected to mongoDB')
}).catch(err => {
    console.log(err)  
})

app.listen(3000, () => {
    console.log("App is running on port 3000")
}) 
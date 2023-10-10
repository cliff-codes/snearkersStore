import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

const app = express()

const url = `mongodb+srv://simplecodes2580:${process.env.MONGOOSE_PASSWORD}@cluster0.ax3s1ku.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url).then(() => {
    console.log('Connected to mongoDB')
}).catch(err => {
    console.log(err)  
})

app.listen(3000, () => {
    console.log("App is running on port 3000")
})
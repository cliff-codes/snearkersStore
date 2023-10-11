import express from "express"
import { signUpCustomer } from "../controllers/customerController.js"

export const router = express.Router()

router.post('/signUp',signUpCustomer)

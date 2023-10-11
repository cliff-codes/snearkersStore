import express from "express"
import { loginCustomer, signUpCustomer } from "../controllers/customerController.js"

export const router = express.Router()

router.post('/signUp',signUpCustomer)
router.post('/login', loginCustomer)

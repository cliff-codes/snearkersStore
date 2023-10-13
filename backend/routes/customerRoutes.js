import express from "express"
import { loginCustomer, signUpCustomer, logoutCustomer, deleteCustomer } from "../controllers/customerController.js"
import { verifyCustomer } from "../utils/verifyCustomer.js"


export const router = express.Router()

router.post('/signUp',signUpCustomer)
router.post('/login', loginCustomer)
router.get('/logout',logoutCustomer)
router.delete('/delete', verifyCustomer ,deleteCustomer)
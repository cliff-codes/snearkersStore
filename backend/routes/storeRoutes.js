import express from "express"
import { createStore } from "../controllers/storeController.js"
import { verifyCustomer } from "../utils/verifyCustomer.js"

export const router = express.Router()

router.post('/createStore',verifyCustomer, createStore) 
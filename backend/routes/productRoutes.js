import express from 'express'
import { createProduct } from '../controllers/productController.js'

export const router = express.Router()

router.post('/create-product', createProduct)
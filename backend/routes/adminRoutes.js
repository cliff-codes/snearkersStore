import express from "express"
import { adminLogin, createAdmin, updateAdmin } from "../controllers/adminController.js"
import { verifyAdmin } from "../utils/verifyAdmin.js"

export const router = express.Router()

router.post('/admin', createAdmin)
router.post('/admin/update', verifyAdmin ,updateAdmin)
router.post('/admin/login', adminLogin)
 
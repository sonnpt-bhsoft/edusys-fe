import express from 'express'
import { requireSignIn, checkRole } from '../common-middleware/index.js'
import { getCategories, createCategory, updateCategory, deleteCategory } from '../controllers/category.js'

const router = express.Router()

router.get('/getCategories', getCategories)
router.post('/create', requireSignIn, checkRole('admin'), createCategory)
router.put('/updateCategory/:id', requireSignIn, checkRole('admin'), updateCategory)
router.patch('/deleteCategory/:id', requireSignIn, checkRole('admin'), deleteCategory)

export default router
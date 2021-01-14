import express from 'express'
import { createCourse } from '../controllers/course.js'
import { requireSignIn, checkRole } from '../common-middleware/index.js'

const router = express.Router()

router.post('/createCourse', requireSignIn, checkRole('admin'), createCourse)

export default router
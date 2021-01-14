import express from 'express'
import { checkRole, requireSignIn } from '../common-middleware/index.js'
import { updateUser } from '../controllers/user.js'

const router = express.Router()

router.put('/updateUser/:id', requireSignIn, checkRole('trainer'), updateUser)

export default router


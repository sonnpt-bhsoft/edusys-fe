import express from 'express'
import { register, login, logOut } from '../controllers/auth.js'
import { validateSignUpRequest, validateSignInRequest, isRequestValidated } from '../validators/auth.js'

const router = express.Router()

router.post('/register', validateSignUpRequest, isRequestValidated, register)
router.post('/login', validateSignInRequest, isRequestValidated, login)
router.post('/logout', logOut)

export default router
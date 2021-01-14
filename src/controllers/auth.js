import { User } from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ message: 'User already existed' })
        }
        const newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        }
        newUser.hash_password = await bcrypt.hash(req.body.password, 10)
        if (req.file) {
            newUser.profilePicture = process.env.API + '/public/' + req.file.filename
        }
        const _user = new User(newUser)
        await _user.save()
        res.status(201).json({ _user, messages: 'User created successfully!!!' })
    } catch (error) {
        res.status(400).json({ message: error.message })
        console.log(error)
    }
}

export const generateToken = user => jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '365d' })
export const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        return !user?.comparePassword(req.body.password) ? 
            res.status(400).json({ message: 'Authentication failed. User not found.' })
                : res.status(200).json({ token: generateToken(user), user })
    } catch (error) {
        return res.status(401).json({ message: error.message })
    }
}

export const logOut = async (req, res) => {
    try {
        await res.clearCookie('token')
        res.status(200).json({ message: 'Sign out successfully!!!' })
    } catch (error) {
        res.status(400).json({ error })
    }
}
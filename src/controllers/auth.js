import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ message: 'User already existed' })
        }
        const { firstName, lastName, email, password } = req.body
        const hash_password = await bcrypt.hash(password, 10)
        const _user = new User({ firstName, lastName, email, hash_password })
        await _user.save()
        res.status(201).json({ _user, messages: 'User created successfully!!!' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).json({ message: 'Authentication failed. User not found.' })
        } else {
            if (user.comparePassword(req.body.password)) {
                const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' })
                const { _id, firstName, lastName, email, role, fullName } = user
                res.status(200).json({
                    token,
                    user: { _id, firstName, lastName, email, role, fullName }
                })
            } else {
                return res.status(400).json({ message: 'Invalid password' })
            }
        }
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
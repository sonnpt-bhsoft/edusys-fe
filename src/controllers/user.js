import User from '../models/user.js'

export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOneAndUpdate({ _id: id },{
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        }, {new: true})
        res.status(200).json({ user })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
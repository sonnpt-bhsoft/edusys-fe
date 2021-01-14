import Course from '../models/course.js'

export const createCourse = async (req, res) => {
    try {
        res.status(201).json({ message: 'Create Course' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

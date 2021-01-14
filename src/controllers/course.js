import Course from '../models/course.js'
import slugify from 'slugify'

export const createCourse = async (req, res) => {
    try {
        const newCourse = new Course({
            name: req.body.name,
            slug: slugify(req.body.name),
            categoryId: req.body.categoryId
        })
        await newCourse.save()
        res.status(201).json({ newCourse })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

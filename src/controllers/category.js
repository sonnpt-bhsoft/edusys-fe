import Category from '../models/category.js';
import slugify from 'slugify'

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ is_deleted: { $ne: true } })
        res.status(200).json({ categories })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const createCategory = async (req, res) => {
    try {
        const newCategory = new Category({
            name: req.body.name,
            slug: slugify(req.body.name)
        })
        await newCategory.save();
        res.status(201).json({ newCategory })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Category.findOneAndUpdate({ _id: id }, {
            name: req.body.name,
            slug: slugify(req.body.name)
        }, { new: true })
        res.status(200).json({ category })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Category.findOneAndUpdate({ _id: id }, {
            is_deleted: true
        }, { new: true })
        res.status(200).json({ category, message: 'Delete Category Successfully!!!' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
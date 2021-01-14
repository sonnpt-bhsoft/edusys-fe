import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        min: 3,
        max: 30,
    },
    slug: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    is_deleted: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true })

const Category = mongoose.model('Category', categorySchema)
export default Category
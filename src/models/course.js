import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    slug: {
        type: String, 
        lowercase: true
    },
    categoryId: {
        type:  mongoose.Schema.ObjectId, ref: 'Category' 
    }
}, { timestamps: true })

const Course = mongoose.model('Course', courseSchema)
export default Course
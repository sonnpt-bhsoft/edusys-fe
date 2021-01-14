import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 30
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 30
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hash_password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'admin', 'trainer', 'teacher'],
    },
    contact: {
        type: String,
    },
    profilePicture: String,
    is_deleted: {
        type: Boolean,
        default: false
    },
    is_active: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

userSchema.virtual('fullName')
    .get(() => `${this.firstName} ${this.lastName}`)

userSchema.methods.comparePassword = password => bcrypt.compareSync(password, this.hash_password);

export const User = mongoose.model('User', userSchema)
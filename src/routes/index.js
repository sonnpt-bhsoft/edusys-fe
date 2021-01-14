import authRoutes from './auth.js'
import categoryRoutes from './category.js'
import userRoutes from './user.js'
import courseRoutes from './course.js'

const route = (app) => {
    app.use('/api/auth', authRoutes)
    app.use('/api/category', categoryRoutes)
    app.use('/api/user', userRoutes)
    app.use('/api/course', courseRoutes)
}

export default route
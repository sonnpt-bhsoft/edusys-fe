import authRoutes from './auth.js'


const route = (app) => {
    app.use('/api', authRoutes)
}

export default route
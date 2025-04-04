// Setup or import package to in the project
import express from 'express'
import cors from 'cors'
import setupSwagger from './swagger/swagger.js'
import dotenv from 'dotenv';

// Using middleware
const app = express()
dotenv.config()
app.use(cors())
app.use(express.json())

// PORT from .env
const PORT = process.env.PORT;

// Import routes
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'

// Using routes
app.use('/api', userRoutes)
app.use('/api', authRoutes)

// Using swagger
setupSwagger(app)

// Listen server on port 5000
app.listen(PORT, (req, res) => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`)
    console.log('📌 API Docs at: http://localhost:5000/api-docs');
})
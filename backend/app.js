// Setup or import package to in the project
import express from 'express'
import cors from 'cors'
import setupSwagger from './swagger/swagger.js'
import dotenv from 'dotenv'

// Setup Express App
const app = express()

// Using middleware
app.use(cors())
app.use(express.json())
dotenv.config()

// Import routes
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'

// Using routes
app.use('/api', userRoutes)
app.use('/api', authRoutes)

// Using swagger
setupSwagger(app)

const startServer = async () => {
    try {
        // await syncDB()
        console.log("✅ Database connected & synced!")

        app.get("/", (req, res) => {
            res.send("Backend is running on Windows! 🚀")
        })

        const PORT = process.env.PORT || 5000
        app.listen(PORT, (req, res) => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`)
            console.log('📌 API Docs at: http://localhost:5000/api-docs')
        })
    } catch (error) {
        console.error("❌ Server failed to start:", error)
    }
}

startServer()
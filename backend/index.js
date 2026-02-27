// packages
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';


// Db connection
import connectDB from './config/connectDb.js';


// configurations
dotenv.config();
connectDB();

const app = express();

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

const PORT = process.env.PORT || 3000;

// routes
import userRoutes from './routes/userRoutes.js'
import genreRoutes from './routes/genreRoutes.js'

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/genre', genreRoutes)

app.listen(PORT, () => console.log(`Server running in port ${PORT}`))

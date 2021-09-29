import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import routes from './routes/index'
import connectDB from './config/database'

//Middleware
const app = express()
app.use(express.json()) // parse application/json, basically parse incoming Request Object as a JSON Object 
app.use(express.urlencoded({extended: false})) // parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())

//Routes
app.use('/api', routes.authRouter)
app.use('/api', routes.userRouter)
app.use('/api', routes.categoryRouter)
app.use('/api', routes.blogRouter)
app.use('/api', routes.commentRouter)

//Database
connectDB()

//Server listenning
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})
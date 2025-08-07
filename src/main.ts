import dotenv from 'dotenv'
dotenv.config()

const ENV = process.env
import mongoose from 'mongoose'
mongoose.connect(`${ENV.MONGO_URL}/${ENV.DB}`)

.then(() => console.log(`Database connected - ${ENV.DB}`))

.catch(() => {
	console.log(`Database connection failed - ${ENV.DB}`)
})

import express, { Request, Response } from 'express'
import morgan from 'morgan'
const app = express()
app.listen(ENV.PORT, () => console.log(`Server is running on http://localhost:${ENV.PORT}`))

import cors from 'cors'
import UserRouter from './user/user.router'
app.use(cors({
	origin: '*'
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.use('/user', UserRouter)

app.use((req: Request, res: Response) => {
	res.status(404).json({ message: `${req.url} not found` })
})
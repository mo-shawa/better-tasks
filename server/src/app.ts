import express, { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import apiRouter from './routes/api'
import usersRouter from './routes/users'
import cors from 'cors'
import bodyParser from 'body-parser'

dotenv.config()

const app: express.Application = express()

app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/api', apiRouter)
app.use('/users', usersRouter)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(err)
	if (err.name === 'ValidationError') {
		res.status(400).json({ error: err.message })
		return
	}
	res.status(500).json({ error: 'Internal server error' })
})

export default app

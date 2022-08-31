import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import apiRouter from './routes/api'
import usersRouter from './routes/users'
import cors from 'cors'
import bodyParser from 'body-parser'

dotenv.config()
import './config/database'

const app: express.Application = express()

app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/api', apiRouter)
app.use('/users', usersRouter)

const port: Number = process.env.PORT ? parseInt(process.env.PORT) : 3000

app.listen(port, () => {
	console.log(`Expressing with TS at ${port}`)
})

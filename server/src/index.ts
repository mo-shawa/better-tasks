import app from './app'
import './config/database'

const port: Number = process.env.PORT ? parseInt(process.env.PORT) : 3000

app.listen(port, () => {
	console.log(`Expressing with TS at ${port}`)
})

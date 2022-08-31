import mongoose from 'mongoose'

const connString: string =
	process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/better-tasks'

mongoose.connect(connString)

const db = mongoose.connection

db.on('connected', (e) => {
	console.log(`Mongoose connected to ${db.name} at ${db.host}:${db.port} `)
})

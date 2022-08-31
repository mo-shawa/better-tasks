import { Request, Response, NextFunction } from 'express'
import Task from '../models/task'

const test = (req: Request, res: Response, next: NextFunction): void => {
	res.status(200).json({ controller: true, count: Math.random() * 200 })
}

const createTask = async (req: Request, res: Response, next: NextFunction) => {
	console.log(req.body)
	let task = await Task.create(req.body)
	res.status(200).json(task)
}

export default {
	test,
	createTask,
}

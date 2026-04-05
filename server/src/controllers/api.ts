import { Request, Response, NextFunction } from 'express'
import Task from '../models/task'

const test = (req: Request, res: Response, next: NextFunction): void => {
	res.status(200).json({ controller: true, count: Math.random() * 200 })
}

const createTask = async (req: Request, res: Response, next: NextFunction) => {
	const { name, detail, priority, why } = req.body

	if (!name || typeof name !== 'string' || name.trim() === '') {
		res.status(400).json({ error: 'name is required' })
		return
	}

	if (priority !== undefined && ![1, 2, 3].includes(priority)) {
		res.status(400).json({ error: 'priority must be 1, 2, or 3' })
		return
	}

	try {
		const task = await Task.create({ name: name.trim(), detail, priority, why })
		res.status(200).json(task)
	} catch (err) {
		next(err)
	}
}

export default {
	test,
	createTask,
}

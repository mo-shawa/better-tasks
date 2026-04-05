import request from 'supertest'
import app from '../app'
import Task from '../models/task'

jest.mock('../models/task', () => ({
	__esModule: true,
	default: {
		create: jest.fn(),
	},
}))

const mockCreate = Task.create as jest.Mock

describe('POST /api/tasks', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('returns 400 when name is missing', async () => {
		const res = await request(app).post('/api/tasks').send({ detail: 'some detail' })
		expect(res.status).toBe(400)
		expect(res.body).toHaveProperty('error', 'name is required')
		expect(mockCreate).not.toHaveBeenCalled()
	})

	it('returns 400 when name is an empty string', async () => {
		const res = await request(app).post('/api/tasks').send({ name: '   ' })
		expect(res.status).toBe(400)
		expect(res.body).toHaveProperty('error', 'name is required')
		expect(mockCreate).not.toHaveBeenCalled()
	})

	it('returns 400 when name is not a string', async () => {
		const res = await request(app).post('/api/tasks').send({ name: 42 })
		expect(res.status).toBe(400)
		expect(res.body).toHaveProperty('error', 'name is required')
		expect(mockCreate).not.toHaveBeenCalled()
	})

	it('returns 400 when priority is invalid', async () => {
		const res = await request(app)
			.post('/api/tasks')
			.send({ name: 'Test Task', priority: 5 })
		expect(res.status).toBe(400)
		expect(res.body).toHaveProperty('error', 'priority must be 1, 2, or 3')
		expect(mockCreate).not.toHaveBeenCalled()
	})

	it('creates task and returns 200 on valid input', async () => {
		const taskData = { name: 'Test Task', detail: 'Details', priority: 1, why: 'Because' }
		mockCreate.mockResolvedValue(taskData as any)

		const res = await request(app).post('/api/tasks').send(taskData)
		expect(res.status).toBe(200)
		expect(res.body).toMatchObject({ name: 'Test Task' })
		expect(mockCreate).toHaveBeenCalledWith({
			name: 'Test Task',
			detail: 'Details',
			priority: 1,
			why: 'Because',
		})
	})

	it('creates task with only required field name', async () => {
		const taskData = { name: 'Minimal Task' }
		mockCreate.mockResolvedValue(taskData as any)

		const res = await request(app).post('/api/tasks').send(taskData)
		expect(res.status).toBe(200)
		expect(mockCreate).toHaveBeenCalledWith({
			name: 'Minimal Task',
			detail: undefined,
			priority: undefined,
			why: undefined,
		})
	})

	it('returns 400 when mongoose ValidationError is thrown', async () => {
		const validationError = new Error('Task validation failed: name: Path `name` is required.')
		validationError.name = 'ValidationError'
		mockCreate.mockRejectedValue(validationError)

		const res = await request(app).post('/api/tasks').send({ name: 'Test' })
		expect(res.status).toBe(400)
		expect(res.body).toHaveProperty('error')
	})

	it('returns 500 when an unexpected database error occurs', async () => {
		mockCreate.mockRejectedValue(new Error('Connection lost'))

		const res = await request(app).post('/api/tasks').send({ name: 'Test' })
		expect(res.status).toBe(500)
		expect(res.body).toHaveProperty('error', 'Internal server error')
	})
})

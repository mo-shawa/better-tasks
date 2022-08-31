import mongoose, { Document, Schema } from 'mongoose'

export interface ITask {
	name: string
	detail: string
	priority: number
	why: string
}

const taskSchema: Schema = new Schema<ITask>(
	{
		name: { type: String, required: true },
		detail: String,
		priority: { type: Number, enum: [1, 2, 3] },
		why: String,
	},
	{
		timestamps: true,
	}
)

export default mongoose.model('Task', taskSchema)

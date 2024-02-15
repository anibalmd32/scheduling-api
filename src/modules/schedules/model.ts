import { Schema, model } from 'mongoose'
import { type ScheduleSchema } from './definitions'

const scheduleSchema = new Schema<ScheduleSchema>({
  classroom: String,
  day: String,
  endTime: String,
  startTime: String,
  subject: String,
  degree: String,
  semester: Number
}, {
  _id: true,
  versionKey: false,
  timestamps: true
})

scheduleSchema.set('toJSON', {
  transform (doc, ret, options) {
    ret.id = ret._id
    delete ret._id
  }
})

const Schedule = model('schedule', scheduleSchema)

export default Schedule

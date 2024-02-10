import { Schema, model } from 'mongoose'
import { type DaySchema } from './definitions'

const daySchema = new Schema<DaySchema>({
  name: String,
  afternoonHours: [String],
  morningHours: [String]
}, {
  _id: true,
  versionKey: false
})

daySchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
  }
})

const Days = model('days', daySchema)

export default Days

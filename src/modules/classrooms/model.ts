import { Schema, model } from 'mongoose'
import { type ClassroomSchema } from './definitions'

const classroomSchema = new Schema<ClassroomSchema>({
  category: String,
  code: String,
  degrees: [String],
  availability: [{
    name: String,
    hours: [String]
  }],
  occupied: [{
    name: String,
    hours: [String]
  }]
}, {
  _id: true,
  versionKey: false
})

classroomSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
  }
})

const Classrooms = model('classrooms', classroomSchema)

export default Classrooms

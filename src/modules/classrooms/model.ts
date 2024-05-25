import { Schema, model } from 'mongoose'
import { type ClassroomSchema } from './definitions'

const classroomSchema = new Schema<ClassroomSchema>({
  category: String,
  code: String,
  degrees: [String],
  isActive: Boolean,
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

const Classrooms = model('classrooms', classroomSchema)

export default Classrooms

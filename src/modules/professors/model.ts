import { Schema, model } from 'mongoose'
import { type ProfessorSchema } from './definitions'

const professorSchema = new Schema<ProfessorSchema>({
  condition: String,
  data: {
    firstName: String,
    lastName: String,
    dni: String,
    email: String,
    phone: String
  }
}, {
  _id: true,
  versionKey: false,
  timestamps: true
})

professorSchema.set('toJSON', {
  transform (doc, ret, options) {
    ret.id = ret._id
    delete ret._id
  }
})

const Professors = model('professors', professorSchema)

export default Professors

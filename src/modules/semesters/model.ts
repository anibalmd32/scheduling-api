import { Schema, model } from 'mongoose'
import { type SemesterSchema } from './definitions'

const semesterSchema = new Schema<SemesterSchema>({
  isActive: Boolean,
  number: Number,
  sections: [{
    code: String,
    subjects: [{
      name: String,
      theoryHours: Number,
      practiceHours: Number,
      laboratoryHours: Number
    }]
  }]
}, {
  _id: true,
  versionKey: false
})

semesterSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
  }
})

const Semesters = model('semesters', semesterSchema)

export default Semesters

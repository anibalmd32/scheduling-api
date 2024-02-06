import { Schema, model } from 'mongoose'
import {
  type TDay,
  type TSemester,
  type TSchedule,
  type TClassroom,
  type TProfessor
} from '../definitions/databaseSchemas'

const daySchema = new Schema<TDay>({
  name: String,
  afternoonHours: [''],
  morningHours: ['']
}, {
  _id: true,
  timestamps: true,
  versionKey: false
})

const semesterSchema = new Schema<TSemester>({
  number: Number,
  subjects: ['']
}, {
  _id: true,
  timestamps: true,
  versionKey: false
})

const classroomSchema = new Schema<TClassroom>({
  code: String,
  hoursAvailable: daySchema,
  hoursBusy: []
}, {
  _id: true,
  timestamps: true,
  versionKey: false
})

const scheduleSchema = new Schema<TSchedule>({
  classrom: classroomSchema,
  day: daySchema,
  endTime: String,
  startTime: String,
  subject: semesterSchema
}, {
  _id: true,
  timestamps: true,
  versionKey: false
})

const professorSchema = new Schema<TProfessor>({
  data: {
    type: {
      firstName: String,
      lastName: String,
      dni: String,
      email: String,
      phone: String
    }
  }
}, {
  _id: true,
  timestamps: true,
  versionKey: false
})

export const Day = model('Day', daySchema)
export const Semester = model('Semester', semesterSchema)
export const Schedule = model('Schedule', scheduleSchema)
export const Classroom = model('Classroom', classroomSchema)
export const Professor = model('Professor', professorSchema)

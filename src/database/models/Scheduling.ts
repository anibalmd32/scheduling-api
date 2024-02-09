import { Schema, model } from 'mongoose'
import {
  type DaySchema,
  type SemesterSchema,
  type ScheduleSchema,
  type ClassroomSchema,
  type ProfessorSchema
} from '../../definitions/schemas'

const daySchema = new Schema<DaySchema>({
  name: String,
  afternoonHours: [],
  morningHours: []
}, {
  _id: true,
  timestamps: true,
  versionKey: false
})

const semesterSchema = new Schema<SemesterSchema>({
  number: Number,
  sections: [{
    code: String,
    subject: []
  }]
}, {
  _id: true,
  timestamps: true,
  versionKey: false
})

const classroomSchema = new Schema<ClassroomSchema>({
  code: String,
  degrees: [],
  hoursAvailable: daySchema,
  hoursBusy: []
}, {
  _id: true,
  timestamps: true,
  versionKey: false
})

const scheduleSchema = new Schema<ScheduleSchema>({
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

const professorSchema = new Schema<ProfessorSchema>({
  data: {
    firstName: String,
    lastName: String,
    dni: String,
    email: String,
    phone: String
  },
  condition: String,
  schedule: [scheduleSchema]
}, {
  _id: true,
  timestamps: true,
  versionKey: false
})

export const Day = model('days', daySchema)
export const Semester = model('semesters', semesterSchema)
export const Schedule = model('schedules', scheduleSchema)
export const Classroom = model('classrooms', classroomSchema)
export const Professor = model('professors', professorSchema)

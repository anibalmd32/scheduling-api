import { type Collection, type Document } from 'mongoose'

export interface DaySchema extends Collection<Document> {
  name: string
  morningHours: string[]
  afternoonHours: string[]
}

export interface SemesterSchema extends Collection<Document> {
  number: number
  sections: [
    {
      code: string
      subjects: string[]
    }
  ]
}

export interface ClassroomSchema extends Collection<Document> {
  code: string
  degrees: string[]
  hoursAvailable: Day[]
  hoursBusy: Schedule[]
}

export interface ScheduleSchema extends Collection<Document> {
  day: Day
  subject: Semester
  startTime: string
  endTime: string
  classrom: Classroom
}

export interface ProfessorSchema extends Collection<Document> {
  data: {
    firstName: string
    lastName: string
    dni: string
    email: string
    phone: string
  }
  condition: string
  schedule: TSchedule[]
}

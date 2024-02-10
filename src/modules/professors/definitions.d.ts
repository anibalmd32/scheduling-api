import { type ScheduleSchema } from '../schedules/definitions'

export interface ProfessorSchema {
  data: {
    firstName: string
    lastName: string
    dni: string
    email: string
    phone: string
  }
  condition: string
  schedule: ScheduleSchema[]
}

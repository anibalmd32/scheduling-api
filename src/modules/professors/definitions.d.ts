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

export interface ProfessorsDTO extends Pick<
ProfessorSchema,
'data' |
'condition'
  > { }

export interface ProfessorsData extends ProfessorSchema {
  _id: string;
}

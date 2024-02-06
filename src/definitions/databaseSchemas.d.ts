export interface TDay {
  name: string
  morningHours: string[]
  afternoonHours: string[]
}

export interface TSemester {
  number: number
  subjects: string[]
}

export interface TClassroom {
  code: string
  hoursAvailable: Day[]
  hoursBusy: Schedule[]
}

export interface TSchedule {
  day: Day
  subject: Semester
  startTime: string
  endTime: string
  classrom: Classroom
}

export interface TProfessor {
  data: {
    firstName: string
    lastName: string
    dni: string
    email: string
    phone: string
  }
  schedule: Schedule
}

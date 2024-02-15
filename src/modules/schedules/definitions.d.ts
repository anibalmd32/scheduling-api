export interface ScheduleDTO {
  semester: string
  degree: string
}

export interface ScheduleSchema {
  day: string
  subject: string
  startTime: string
  endTime: string
  classroom: string
  semester: number
  degree: string
}

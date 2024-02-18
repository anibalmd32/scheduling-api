export interface ScheduleDTO {
  semester: string
  degree: string
  classroom?: string
}

export interface ScheduleSchema {
  day: string
  subject: string
  startTime: string
  endTime: string
  classroom: string
  semester: number
  degree: string
  extra: {
    hourInterval: number
    subjectType: string
  }
}

export interface ScheduleDTO {
  semester: string
  degree: string
  classroom?: string
}

export interface SubjectScheduleDTO {
  id: string
  startTime: string
  endTime: string
  day: string
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
  [key: string]: any
}

export interface ScheduleData extends ScheduleSchema {
  _id: string
}

export interface ScheduleEvent {
  id: string
  title: string
  start: string
  end: string
  metadata: Array<{
    key: string
    value: string
  }>
  type: string
}

export type ScheduleParam = 'semester' | 'degree' | 'classroom'

export interface ScheduleQuery {
  query: ScheduleParam
  value: string
}

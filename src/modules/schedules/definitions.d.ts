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
  subjectId?: string
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

export type ScheduleParam = 'semester' | 'degree' | 'classroom' | 'professor'

export interface ScheduleQuery {
  query: ScheduleParam
  value: string
}

export interface ScheduleDataDTO {
  start: string
  end: string
  clarrooom: string
  semester: number | undefined
  subject: string
  subjectId: string
  typeClassroom: string
  day: string
  hours: number
  typeSubject: string
}

export interface UpdateSchedueleDTO {
  day: string
  start: string
  end: string
  typeSubject: string
  hours: number
  subject: string
}

export interface DeleteSubjectDTO {
  subject: string
  typeSubject: string
}

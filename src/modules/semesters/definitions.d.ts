export interface Subject {
  _id?: string
  name: string
  theoryHours: number
  practiceHours: number
  laboratoryHours: number
}

export interface Section {
  code: string
  subjects: Subject[]
}
export interface SemesterSchema {
  number: number
  isActive: boolean
  sections: Section[]
}

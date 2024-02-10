export interface SemesterSchema {
  number: number
  isActive: boolean
  sections: [
    {
      code: string
      subjects: Array<{
        name: string
        theoryHours: number
        practiceHours: number
        laboratoryHours: number
      }>
    }
  ]
}

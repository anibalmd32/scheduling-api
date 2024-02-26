import Semesters from './model'
import { type SemesterSchema } from './definitions'

export default class SemesterService {
  async getSemesters (number: number): Promise<SemesterSchema[]> {
    const allSemesters = await Semesters.find()

    return allSemesters
  }
}

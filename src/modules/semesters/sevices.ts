import Semesters from './model'
import { type SemesterSchema, type Subject } from './definitions'
import Schedule from '../schedules/model'

export default class SemesterService {
  async getSemesters (number: number): Promise<SemesterSchema[]> {
    const allSemesters = await Semesters.find()

    return allSemesters
  }

  async updateOneSubject (subjectId: string, data: Subject): Promise<Subject[]> {
    const updatedSemester = await Semesters.findOneAndUpdate(
      { 'sections.subjects._id': subjectId },
      { $set: { 'sections.$[i].subjects.$[j]': data } },
      {
        arrayFilters: [
          { 'i.subjects._id': subjectId },
          { 'j._id': subjectId }
        ],
        new: true
      }
    )

    // ? Update subject in schedule
    await Schedule.findOneAndUpdate(
      { subjectId: data._id },
      { subject: data.name }
    )

    if (updatedSemester === null) {
      throw new Error('Cannot update')
    }

    const updatedSubject: Subject[] = updatedSemester.sections[0]
      .subjects.filter(subject => subject._id?.toString() === subjectId)

    return updatedSubject
  }

  async createSubject (sectionId: string, data: Subject): Promise<void> {
    const subjectData: Subject = {
      laboratoryHours: data.laboratoryHours,
      name: data.name,
      practiceHours: data.practiceHours,
      theoryHours: data.practiceHours
    }

    const newSubject = await Semesters.findOneAndUpdate(
      { 'sections._id': sectionId },
      { $push: { 'sections.$.subjects': subjectData } },
      { new: true }
    )

    if (newSubject === null) {
      throw new Error('Cannot create')
    }
  }

  async deleteSubject (subjectId: string): Promise<void> {
    const deletedSubject = await Semesters.findOneAndUpdate(
      { 'sections.subjects._id': subjectId },
      { $pull: { 'sections.$.subjects': { _id: subjectId } } },
      { new: true }
    )

    if (deletedSubject === null) {
      throw new Error('Cannot delete subject')
    }
  }
}

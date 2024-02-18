// * Models
import Classrooms from './model'

// * Libs
import {
  createWeekSchedule,
  createVoidSchedule
} from '../../libs/createWeekSchedule'

// * Definitions
import {
  type ClassroomSchema,
  type ClassroomDTO,
  type ClassroomFilters
} from './definitions'

export class ClassroomServices {
  async addOneClassroom (data: ClassroomDTO):
  Promise<ClassroomSchema> {
    const dataForAdd: ClassroomSchema = {
      code: data.code,
      category: data.category,
      degrees: data.degrees,
      availability: createWeekSchedule(),
      occupied: createVoidSchedule()
    }
    const newClassroom = await Classrooms.create(dataForAdd)

    const classroomSaved = await newClassroom.save()

    return classroomSaved
  }

  async getClassrooms (filters: ClassroomFilters):
  Promise<ClassroomSchema[] | []> {
    let query = {}

    if (
      filters.category !== undefined ||
      filters.code !== undefined ||
      filters.degrees !== undefined
    ) {
      query = {
        $or: [
          { code: filters.code },
          { category: filters.category },
          { degrees: { $in: filters.degrees } }
        ]
      }
    }

    const classroomsFiltered = await Classrooms.find(query)

    return classroomsFiltered
  }

  async updateClassroom (data: Partial<ClassroomDTO>, id: string):
  Promise<ClassroomSchema | null> {
    const updatedClassroom = await Classrooms.findByIdAndUpdate(
      id,
      data,
      { new: true }
    )

    return updatedClassroom
  }

  async deleteClassroom (id: string):
  Promise<ClassroomSchema | null> {
    const deletedClassroom = await Classrooms.findByIdAndDelete(id)

    return deletedClassroom
  }
}

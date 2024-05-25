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
  async addOneClassroom (data: ClassroomDTO): Promise<ClassroomSchema> {
    const dataForAdd: ClassroomSchema = {
      code: data.code,
      isActive: true,
      category: data.category,
      degrees: ['sistemas'],
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
      filters.isActive !== undefined
    ) {
      query = {
        $or: [
          { code: filters.code },
          { category: filters.category },
          { isActive: filters.isActive }
        ]
      }
    }

    const classroomsFiltered = await Classrooms.find(query)

    return classroomsFiltered
  }

  async updateClassroom (data: Partial<ClassroomDTO>, id: string): Promise<ClassroomSchema | null> {
    const updatedClassroom = await Classrooms.findByIdAndUpdate(
      id,
      data,
      { new: true }
    )

    return updatedClassroom
  }

  async deleteClassroom (id: string): Promise<void> {
    await Classrooms.findByIdAndDelete(id)
  }

  async updateClassroomIsActive (id: string, isActive: boolean): Promise<ClassroomSchema | null> {
    const updatedClassroom = await Classrooms.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    )

    return updatedClassroom
  }
}

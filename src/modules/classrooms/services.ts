// * Models
import Classrooms from './model'
import Schedule from '../schedules/model'

// * Libs
import {
  createWeekSchedule,
  createVoidSchedule,
} from '../../libs/createWeekSchedule'

import { formatEvent } from '../../libs/formatEvent'

// * Definitions
import {
  type ClassroomSchema,
  type ClassroomDTO,
  type ClassroomFilters
} from './definitions'
import { ScheduleSchema } from '../schedules/definitions'
import { ScheduleEvent } from '../schedules/definitions'

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

  async getOneClassroomWithSchedule(id: string): Promise<{
    data: ClassroomSchema,
    schedules: ScheduleSchema[]
  }> {
    const classroom = await Classrooms.findById(id)
    
    if (!classroom) throw new Error('No se encontro el aula')

    const schedules = await Schedule.find({ classroom: classroom.code })

    return {
      data: classroom,
      schedules: schedules || []
    }
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

  async forPrintSchedule(id: string): Promise<ScheduleEvent[]> {
    const classroom = await Classrooms.findById(id)
    const schedules = await Schedule.find({ classroom: classroom?.code })

    const events = schedules.map(schedule => {
      return formatEvent({
        _id: String(schedule._id),
        classroom: schedule.classroom,
        day: schedule.day,
        endTime: schedule.endTime,
        startTime: schedule.startTime,
        subject: schedule.subject,
        degree: schedule.degree,
        semester: schedule.semester,
        extra: {
          hourInterval: schedule.extra.hourInterval,
          subjectType: schedule.extra.subjectType
        }
      }, 'classroom')
    })

    return events
  }

}

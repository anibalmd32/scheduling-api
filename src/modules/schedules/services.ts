// ** Libs
import { formatInterval } from '../../libs/formatInterval'
import { generateRandomDay } from '../../libs/generateRandomDay'
import { formatEvent } from '../../libs/formatEvent'

// ** Models
import Schedule from './model'
import Classrooms from '../classrooms/model'
import Semesters from '../semesters/model'

// ** Types
import {
  type ScheduleDTO,
  type ScheduleEvent,
  type SubjectScheduleDTO,
  type ScheduleData,
  type ScheduleParam,
  type ScheduleQuery
} from './definitions'

// ** Utils
import { subjectsForLab } from '../../utils/subjectsForLab'
import { subjectsForPC, dinForPc } from '../../utils/subjectsForPc'

export default class ScheduleServices {
  async generateBySemester (data: ScheduleDTO):
  Promise<void> {
    const semester = await Semesters.findOne({
      number: data.semester
    })

    const scheduleExists = await Schedule.find({
      $and: [
        { degree: data.degree },
        { semester: data.semester }
      ]
    })

    if (scheduleExists.length > 1) {
      throw new Error('Esta carrera ya tiene horario para este semestre')
    }

    if ((semester?.sections) == null) {
      throw new Error('Este semestre no tiene secciones')
    }

    if (!semester.isActive) {
      throw new Error('Este semestre no está activo')
    }

    for (const section of semester?.sections) {
      const { subjects } = section
      const query = {
        degrees: {
          $in: [data.degree]
        },
        availability: {
          $elemMatch: {
            hours: { $exists: true, $not: { $size: 0 } }
          }
        }
      }

      for (const subject of subjects) {
        const { laboratoryHours, name, practiceHours, theoryHours } = subject
        const subjectHours: Record<string, number> = { laboratoryHours, practiceHours, theoryHours }

        for (const hours in subjectHours) {
          if (subjectHours[hours] !== 0) {
            const hourInterval = formatInterval(subjectHours[hours])
            let category: string[]

            hours === 'laboratoryHours' && subjectsForLab.includes(name)
              ? category = ['laboratory']
              : hours === 'laboratoryHours' && subjectsForPC.includes(name)
                ? category = ['pc']
                : hours === 'practiceHours' && subjectsForPC.includes(name)
                  ? category = ['pc']
                  : hours === 'theoryHours' && dinForPc.includes(name)
                    ? category = ['pc']
                    : category = ['normal']

            const classroom = await Classrooms.findOne({
              ...query,
              category: { $in: category }
            })

            if (classroom == null) {
              throw new Error('No hay salón disponible')
            }

            const classroomDays = classroom.availability.filter(day => (day.hours.length !== 0))

            const dayToAsign = generateRandomDay(classroomDays, hours)
            const allAvailableHours = dayToAsign.hours
            const interval = allAvailableHours.slice(0, hourInterval)
            const start = interval[0]
            const end = interval[interval.length - 1]

            await Classrooms.updateOne(
              { _id: classroom._id, 'availability.name': dayToAsign.name },
              {
                $pull: {
                  'availability.$.hours': { $in: interval }
                }
              }
            )

            await Classrooms.updateOne(
              { _id: classroom._id, 'availability.name': dayToAsign.name },
              {
                $push: {
                  'occupied.$.hours': { $each: interval }
                }
              }
            )

            await Schedule.create({
              classroom: classroom.code,
              day: dayToAsign.name,
              endTime: end,
              startTime: start,
              subject: subject.name,
              degree: data.degree,
              semester: data.semester,
              extra: {
                hourInterval: interval.length,
                subjectType: hours === 'laboratoryHours'
                  ? 'Laboratorio'
                  : hours === 'practiceHours'
                    ? 'Práctica'
                    : 'Teoría'
              }
            })
          }
        }
      }
    }
  }

  async getScheduleEvents (data: ScheduleQuery):
  Promise<ScheduleEvent[]> {
    const schedulesData = await Schedule.find({
      [data.query]: data.value
    })

    const events: ScheduleEvent[] = schedulesData.map(sch => {
      const details: ScheduleData = {
        _id: String(sch._id),
        classroom: sch.classroom,
        day: sch.day,
        endTime: sch.endTime,
        startTime: sch.startTime,
        subject: sch.subject,
        degree: sch.degree,
        semester: sch.semester,
        extra: sch.extra
      }

      const param: ScheduleParam = data.query

      return formatEvent(details, param)
    })

    return events
  }

  async updateSubjectSchedule (data: SubjectScheduleDTO): Promise<void> {
    await Schedule.findOneAndUpdate(
      { _id: data.id },
      {
        day: data.day,
        endTime: data.endTime,
        startTime: data.startTime
      }
    )
  }
}

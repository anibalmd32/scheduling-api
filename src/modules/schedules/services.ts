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
  type ScheduleQuery,
  type ScheduleDataDTO,
  type UpdateSchedueleDTO
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

    let searchValue;
    
    // TODO: Refactor this from if/else to indexable object
    if (data.query === 'classroom') {
      const classroomData = await Classrooms.findById(data.value)
      searchValue = classroomData?.code
    } else if (data.query === 'semester') {
      const semesterData = await Semesters.findById(data.value)
      searchValue = semesterData?.number
    }
    
    const schedulesData = await Schedule.find({
      [data.query]: searchValue
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

  async createScheduleFromClassroom (data: ScheduleDataDTO): Promise<ScheduleEvent> {

    // ? Update Subject hours by its type
    const typeSubject = data.typeSubject

    const typeHours: Record<string, string> = {
      'teoria': 'theoryHours',
      'practica': 'practiceHours',
      'laboratorio': 'laboratoryHours'
    }

    const setKey = `sections.$[].subjects.$[j].${typeHours[typeSubject]}`;

    await Semesters.findOneAndUpdate(
      { 'sections.subjects.name': data.subject },
      { $set: { [setKey]: data.hours } },
      {
        arrayFilters: [
          { 'j.name': data.subject },
        ]
      }
    )

    // ? Add new Schedule
    const schedule = new Schedule({
      day: data.day,
      startTime: data.start,
      endTime: data.end,
      classroom: data.clarrooom,
      subject: data.subject,
      degree: 'sistemas',
      semester: data.semester,
      extra: {
        subjectType: data.typeSubject
      }
    })

    await schedule.save()

    // ? Get the new schedule formated and return
    const scheduleEvent = formatEvent({
      _id: String(schedule._id),
      classroom: data.clarrooom,
      day: data.day,
      endTime: data.end,
      startTime: data.start,
      subject: data.subject,
      degree: 'sistemas',
      semester: data.semester!,
      extra: {
        hourInterval: 0,
        subjectType: data.typeClassroom
      }
    }, 'classroom');

    return scheduleEvent;
  }

  async updateSchedule(id: string, data: UpdateSchedueleDTO): Promise<ScheduleEvent> {
    const schedule = await Schedule.findOne({
      _id: id
    })

    if (schedule == null) {
      throw new Error('No se encontro el horario')
    }

    const updated = await Schedule.findOneAndUpdate(
      { _id: id },
      {
        day: data.day,
        endTime: data.end,
        startTime: data.start
      },
      { new: true}
    )

    if (updated == null) {
      throw new Error('Error al actualizar el horario')
    }

    const scheduleEvent = formatEvent({
      _id: String(updated._id),
      classroom: updated.classroom,
      day: updated.day,
      endTime: updated.endTime,
      startTime: updated.startTime,
      subject: updated.subject,
      degree: updated.degree,
      semester: updated.semester,
      extra: {
        hourInterval: updated.extra.hourInterval,
        subjectType: updated.extra.subjectType
      }
    }, 'classroom')

    return scheduleEvent
  }

  async deleteSchedule(id: string): Promise<void> {
    await Schedule.findOneAndDelete({ _id: id })
  }
}

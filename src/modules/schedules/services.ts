// ** Models
import Schedule from './model'
import Classrooms from '../classrooms/model'
import Semesters from '../semesters/model'

// ** Types
import { type ScheduleSchema, type ScheduleDTO } from './definitions'

// ** Utils
import { subjectsForLab } from '../../utils/subjectsForLab'
import { subjectsForPC, dinForPc } from '../../utils/subjectsForPc'

// ** Libs
import { formatInterval } from '../../libs/formatInterval'
import { generateRandomDay } from '../../libs/generateRandomDay'

export default class ScheduleServices {
  async generateBySemester (data: ScheduleDTO):
  Promise<ScheduleSchema[]> {
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
              semester: data.semester
            })

            // console.log(`
            //   Materia: ${subject.name}
            //   Aula: ${classroom.code}
            //   Tipo de hora: ${hours}
            //   Numero de horas: ${subjectHours[hours]}
            //   Dia: ${dayToAsign.name}
            //   Hora de entrada: ${start}
            //   Hora de salida: ${end}
            // `)
          }
        }
      }
    }

    const schedule = await Schedule.find({
      $and: [
        { degree: data.degree },
        { semester: data.semester }
      ]
    })

    return schedule
  }
}

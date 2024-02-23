import Professors from './model'
import Schedule from '../schedules/model'
import { type ProfessorsDTO, type ProfessorSchema } from './definitions'

export class ProfessorServices {
  async addProfessor (data: ProfessorsDTO):
  Promise<ProfessorSchema> {
    const dataForAdd: ProfessorSchema = {
      condition: data.condition,
      data: data.data,
      schedule: []
    }
    const newProfessor = await Professors.create(dataForAdd)

    const savedProfessor = await newProfessor.save()

    return savedProfessor
  }

  async asingSchedule (shecheduleId: string, professorId: string):
  Promise<ProfessorSchema | null> {
    const scheduleForAsign = await Schedule.findById(shecheduleId)
    const updatedProfessor = await Professors.findByIdAndUpdate(
      professorId,
      {
        $push: {
          schedule: scheduleForAsign
        }
      }
    )

    return updatedProfessor
  }

  async removeSchedule (shecheduleId: string, professorId: string):
  Promise<void> {
    await Professors.updateOne(
      { _id: professorId, 'schedule._id': shecheduleId },
      {
        $pull: {
          'schedule.$._id': shecheduleId
        }
      }
    )
  }
}

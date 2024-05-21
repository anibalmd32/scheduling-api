import Professors from './model'
import Schedule from '../schedules/model'
import { type ProfessorsDTO, type ProfessorSchema, type ProfessorsData } from './definitions'

export class ProfessorServices {
  async getProfessors(): Promise<ProfessorsData[]> {
    const professors = await Professors.find({});

    return professors.map(professor => ({
      _id: String(professor._id),
      condition: professor.condition,
      data: professor.data,
      schedule: professor.schedule
    }))
  }

  async addProfessor (data: ProfessorsDTO): Promise<void> {

    const dataForAdd: ProfessorSchema = {
      condition: data.condition,
      data: data.data,
      schedule: []
    }

    const newProfessor = await Professors.create(dataForAdd)

    await newProfessor.save()
  }

  async asingSchedule (shecheduleId: string, professorId: string):
  Promise<void> {
    const scheduleForAsign = await Schedule.findById(shecheduleId)
    
    await Professors.findByIdAndUpdate(
      professorId,
      {
        $push: {
          schedule: scheduleForAsign
        }
      }
    )
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

  async updateProfessor(professorId: string, professorData: ProfessorsDTO): Promise<ProfessorsData> {
    
    const updatedProfessor = await Professors.findByIdAndUpdate(
      professorId,
      { data: professorData },
      { new: true }
    )

    if (!updatedProfessor) throw new Error('No se pudo actualizar la informacion del profesor')

    return {
      _id: String(updatedProfessor?._id),
      condition: updatedProfessor.condition,
      data: updatedProfessor.data,
      schedule: updatedProfessor.schedule
    }
  }

  async deleteProfessor(professorId: string): Promise<void> {
    await Professors.findByIdAndDelete(professorId)
  }
}

import { type Request, type Response } from 'express'
import { ClassroomServices } from './services'
import { type ClassroomFilters, type ClassroomDTO } from './definitions'

const service = new ClassroomServices()
export class ClassroomControllers {
  async createOne (req: Request, res: Response): Promise<void> {
    const { category, code, degrees } = req.body as ClassroomDTO

    try {
      const newClassroom = await service.addOneClassroom({
        category, code, degrees
      })

      res.status(200).json(newClassroom)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async getAll (req: Request, res: Response): Promise<void> {
    const { category, code, degrees } = req.query as ClassroomFilters

    try {
      const classroomsData = await service.getClassrooms({
        category, code, degrees
      })

      res.status(200).json(classroomsData)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
}

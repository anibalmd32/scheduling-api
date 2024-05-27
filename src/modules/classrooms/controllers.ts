import { type Request, type Response } from 'express'
import { ClassroomServices } from './services'
import { type ClassroomFilters, type ClassroomDTO } from './definitions'

const service = new ClassroomServices()
export class ClassroomControllers {
  async createOne (req: Request, res: Response): Promise<void> {
    const { category, code } = req.body as ClassroomDTO

    try {
      const newClassroom = await service.addOneClassroom({
        category, code
      })

      res.status(200).json(newClassroom)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async getAll (req: Request, res: Response): Promise<void> {
    const { category, code, isActive } = req.query as ClassroomFilters

    try {
      const classroomsData = await service.getClassrooms({
        category, code, isActive
      })

      res.status(200).json(classroomsData)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async updateData (req: Request, res: Response): Promise<void> {
    const { category, code } = req.body as Partial<ClassroomDTO>
    const id = req.params.id

    try {
      const updatedClassroom = await service.updateClassroom({
        category, code
      }, id)

      res.status(200).json(updatedClassroom)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async deleteOne (req: Request, res: Response): Promise<void> {
    const id = req.params.id

    try {
      const deletedClassroom = await service.deleteClassroom(id)

      res.status(200).json(deletedClassroom)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async updateIsActive (req: Request, res: Response): Promise<void> {
    const id = req.params.id
    const isActive = req.body.isActive

    try {
      const updatedClassroom = await service.updateClassroomIsActive(id, isActive)

      res.status(200).json(updatedClassroom)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async forPrint (req: Request, res: Response): Promise<void> {
    const id = req.params.id

    try {
      const events = await service.forPrintSchedule(id)
      res.status(200).json(events)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
}

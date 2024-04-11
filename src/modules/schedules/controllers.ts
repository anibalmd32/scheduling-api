import { type Request, type Response } from 'express'
import { type ScheduleDTO } from './definitions'
import ScheduleServices from './services'

const service = new ScheduleServices()

export default class ScheduleControllers {
  async generateBySemester (req: Request, res: Response): Promise<void> {
    const { degree, semester } = req.body as ScheduleDTO

    try {
      await service.generateBySemester({ degree, semester })

      res.status(200).json({ message: 'Horario generado exitosamente' })
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async getEvents (req: Request, res: Response): Promise<void> {
    const degree = req.query.degree as string
    const semester = req.query.semester as string
    const classroom = req.query.classroom as string

    try {
      const data = await service.getScheduleEvent({
        degree,
        semester,
        classroom
      })
      res.status(200).json(data)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
}

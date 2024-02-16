import { type Request, type Response } from 'express'
import { type ScheduleDTO } from './definitions'
import ScheduleServices from './services'

const service = new ScheduleServices()

export default class ScheduleControllers {
  async generateBySemester (req: Request, res: Response): Promise<void> {
    const { degree, semester } = req.body as ScheduleDTO

    try {
      await service.generateBySemester({ degree, semester })

      res.status(200).json({ message: 'success' })
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async generateSchedulePdf (req: Request, res: Response): Promise<void> {
    try {
      await service.generateSchedulePdf({
        degree: 'sistemas',
        semester: '1'
      })
      res.status(200).json({ message: 'success' })
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
}

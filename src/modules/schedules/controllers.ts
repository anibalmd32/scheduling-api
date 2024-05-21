import { type Request, type Response } from 'express'
import {
  type ScheduleDTO,
  type SubjectScheduleDTO,
  type ScheduleDataDTO,
  type UpdateSchedueleDTO,
  type DeleteSubjectDTO
} from './definitions'
import ScheduleServices from './services'

const service = new ScheduleServices()

export default class ScheduleControllers {
  async getAllSchedules (req: Request, res: Response): Promise<void> {
    try {
      const schedules = await service.getAllSchedules()
      res.status(200).json(schedules)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
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
    const queryKey: string = Object.keys(req.query)[0]
    const queryValue: string = req.query[queryKey] as string

    try {
      const data = await service.getScheduleEvents({
        query: queryKey as 'semester' | 'degree' | 'classroom',
        value: queryValue
      })
      res.status(200).json(data)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async updateSubjectSchedule (req: Request, res: Response): Promise<void> {
    const data = req.body as SubjectScheduleDTO

    try {
      await service.updateSubjectSchedule(data)
      res.status(200).json({ message: 'success' })
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async createScheduleFromClassroom (req: Request, res: Response): Promise<void> {
    const data = req.body as ScheduleDataDTO

    try {
      const scheduleEvet = await service.createScheduleFromClassroom(data)
      res.status(200).json(scheduleEvet)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async updateSchedule (req: Request, res: Response): Promise<void> {
    const data = req.body as UpdateSchedueleDTO
    const { id } = req.params

    try {
      const scheduleEvent = await service.updateSchedule(String(id), data)
      res.status(200).json(scheduleEvent)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async deleteSchedule (req: Request, res: Response): Promise<void> {
    const { id } = req.params
    const data = req.body as DeleteSubjectDTO

    try {
      await service.deleteSchedule(String(id), data)
      res.status(200).json({ message: 'success' })
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
}

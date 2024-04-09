import type { Request, Response } from 'express'
import SemesterService from './sevices'
import { type Subject } from './definitions'

const service = new SemesterService()

export default class SemesterController {
  async getAll (req: Request, res: Response): Promise<void> {
    const semesterNumber: number = Number(req.query.number)
    try {
      const data = await service.getSemesters(semesterNumber)
      res.status(200).json(data)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async updateSubject (req: Request, res: Response): Promise<void> {
    const subjectId = String(req.params.id)
    const subjectData = req.body as Subject

    try {
      const data = await service.updateOneSubject(subjectId, subjectData)
      res.status(200).json(data)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async createSubject (req: Request, res: Response): Promise<void> {
    const sectionId = String(req.query.section)
    const subjectData = req.body as Subject

    try {
      await service.createSubject(sectionId, subjectData)
      res.status(200).json({ message: 'success' })
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
}

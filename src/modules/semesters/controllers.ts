import type { Request, Response } from 'express'
import SemesterService from './sevices'

const sevice = new SemesterService()

export default class SemesterController {
  async getAll (req: Request, res: Response): Promise<void> {
    const semesterNumber: number = Number(req.query.number)
    try {
      const data = await sevice.getSemesters(semesterNumber)
      res.status(200).json(data)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
}

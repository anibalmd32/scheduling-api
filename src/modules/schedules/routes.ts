import { Router } from 'express'
import ScheduleControllers from './controllers'

const router = Router()
const controllers = new ScheduleControllers()
const baseUrl = '/schedules'

router.post(baseUrl, async (req, res) => {
  await controllers.generateBySemester(req, res)
})

export default router

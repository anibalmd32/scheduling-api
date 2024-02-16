import { Router } from 'express'
import ScheduleControllers from './controllers'

const router = Router()
const controllers = new ScheduleControllers()
const baseUrl = '/schedules'

router.post(baseUrl, async (req, res) => {
  await controllers.generateBySemester(req, res)
})

router.get(baseUrl, async (req, res) => {
  await controllers.generateSchedulePdf(req, res)
})

export default router

import { Router } from 'express'
import ScheduleControllers from './controllers'

const router = Router()
const controllers = new ScheduleControllers()
const baseUrl = '/schedules'

router.post(`${baseUrl}/generate-data`, async (req, res) => {
  await controllers.generateBySemester(req, res)
})

router.post(`${baseUrl}/generate-pdf`, async (req, res) => {
  await controllers.generateSchedulePdf(req, res)
})

router.get(`${baseUrl}/has-events`, async (req, res) => {
  await controllers.getEvents(req, res)
})

export default router

import { Router } from 'express'
import ScheduleControllers from './controllers'

const router = Router()
const controllers = new ScheduleControllers()
const baseUrl = '/schedules'

router.post(`${baseUrl}/generate-data`, async (req, res) => {
  await controllers.generateBySemester(req, res)
})

router.get(`${baseUrl}/as-events`, async (req, res) => {
  await controllers.getEvents(req, res)
})

router.put(`${baseUrl}/subjects/update`, async (req, res) => {
  await controllers.updateSubjectSchedule(req, res)
})

export default router

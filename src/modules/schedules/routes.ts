import { Router } from 'express'
import ScheduleControllers from './controllers'

const router = Router()
const controllers = new ScheduleControllers()

router.post('/generate-data', async (req, res) => {
  await controllers.generateBySemester(req, res)
})

router.get('/as-events', async (req, res) => {
  await controllers.getEvents(req, res)
})

router.put('/subjects/update', async (req, res) => {
  await controllers.updateSubjectSchedule(req, res)
})

export default router

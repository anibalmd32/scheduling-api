import { Router } from 'express'
import ScheduleControllers from './controllers'

const router = Router()
const controllers = new ScheduleControllers()

router.get('/', async (req, res) => {
  await controllers.getAllSchedules(req, res)
})

router.post('/generate-data', async (req, res) => {
  await controllers.generateBySemester(req, res)
})

router.get('/as-events', async (req, res) => {
  await controllers.getEvents(req, res)
})

router.put('/subjects/update', async (req, res) => {
  await controllers.updateSubjectSchedule(req, res)
})

router.post('/classroom/create', async (req, res) => {
  await controllers.createScheduleFromClassroom(req, res)
})

router.put('/as-events/:id', async (req, res) => {
  await controllers.updateSchedule(req, res)
})

router.delete('/as-events/:id', async (req, res) => {
  await controllers.deleteSchedule(req, res)
})

export default router

import { Router } from 'express'
import { ClassroomControllers } from './controllers'

const router = Router()
const controller = new ClassroomControllers()
const baseUrl = '/classrooms'

router.post(`${baseUrl}`, async (req, res) => {
  await controller.createOne(req, res)
})

router.get(`${baseUrl}`, async (req, res) => {
  await controller.getAll(req, res)
})

export default router

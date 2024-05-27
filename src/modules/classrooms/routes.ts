import { Router } from 'express'
import { ClassroomControllers } from './controllers'

const router = Router()
const controller = new ClassroomControllers()

router.post('/', async (req, res) => {
  await controller.createOne(req, res)
})

router.get('/', async (req, res) => {
  await controller.getAll(req, res)
})

router.put(`/:id`, async (req, res) => {
  await controller.updateData(req, res)
})

router.delete(`/:id`, async (req, res) => {
  await controller.deleteOne(req, res)
})

router.patch(`/:id`, async (req, res) => {
  await controller.updateIsActive(req, res)
})

router.get('/for-print/:id', async (req, res) => {
  await controller.forPrint(req, res)
})

export default router

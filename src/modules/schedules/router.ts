/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import ModuleService from '../../libs/ModuleService'
import ModuleController from '../../libs/ModuleController'
import { Schedule } from '../../models/Scheduling'
import { type ScheduleSchema } from '../../definitions/schemas'

const router = Router()

const service = new ModuleService<ScheduleSchema>(Schedule)
const controller = new ModuleController<ScheduleSchema>(service)

router.post('/', async (req, res) => {
  await controller.post(req, res)
})

router.get('/', async (req, res) => {
  await controller.get(req, res)
})

router.put('/', async (req, res) => {
  await controller.update(req, res)
})

router.delete('/', async (req, res) => {
  await controller.delete(req, res)
})

export default router

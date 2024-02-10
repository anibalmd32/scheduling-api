/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import ModuleService from '../../libs/ModuleService'
import ModuleController from '../../libs/ModuleController'
import { Day } from '../../database/models/Scheduling'
import { type DaySchema } from '../../definitions/schemas'

const router = Router()

const service = new ModuleService<DaySchema>(Day)
const controller = new ModuleController<DaySchema>(service)

const baseUrl = '/days'

router.post(baseUrl, async (req, res) => {
  await controller.post(req, res)
})

router.get(baseUrl, async (req, res) => {
  await controller.get(req, res)
})

router.put(baseUrl, async (req, res) => {
  await controller.update(req, res)
})

router.delete(baseUrl, async (req, res) => {
  await controller.delete(req, res)
})

export default router

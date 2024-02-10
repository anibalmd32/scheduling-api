/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import ModuleService from '../../libs/ModuleService'
import ModuleController from '../../libs/ModuleController'
import { Professor } from '../../database/models/Scheduling'
import { type ProfessorSchema } from '../../definitions/schemas'

const router = Router()

const service = new ModuleService<ProfessorSchema>(Professor)
const controller = new ModuleController<ProfessorSchema>(service)

const baseUrl = '/professors'

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

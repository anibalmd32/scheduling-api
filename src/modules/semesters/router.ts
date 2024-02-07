/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import ModuleService from '../../libs/ModuleService'
import ModuleController from '../../libs/ModuleControllers'
import { Semester } from '../../models/Scheduling'
import { type SemesterSchema } from '../../definitions/schemas'

const router = Router()

const service = new ModuleService<SemesterSchema>(Semester)
const controller = new ModuleController<SemesterSchema>(service)

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

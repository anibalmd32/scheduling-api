/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import ModuleService from '../../libs/ModuleService'
import ModuleController from '../../libs/ModuleController'
import { Classroom } from '../../models/Scheduling'
import { type ClassroomSchema } from '../../definitions/schemas'

const router = Router()

const service = new ModuleService<ClassroomSchema>(Classroom)
const controller = new ModuleController<ClassroomSchema>(service)

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

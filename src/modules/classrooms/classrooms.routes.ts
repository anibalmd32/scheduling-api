import { Router } from 'express'
import ModuleService from '../../libs/ModuleService'
import ModuleController from '../../libs/ModuleController'
import { Classroom } from '../../database/models/Scheduling'
import { type ClassroomSchema } from '../../definitions/schemas'

const router = Router()

const service = new ModuleService<ClassroomSchema>(Classroom)
const controller = new ModuleController<ClassroomSchema>(service)

const baseUrl = '/classrooms'

router.post(baseUrl, (req, res) => {
  void controller.post(req, res)
})

router.get(baseUrl, (req, res) => {
  void controller.get(req, res)
})

router.put(baseUrl, (req, res) => {
  void controller.update(req, res)
})

router.delete(baseUrl, (req, res) => {
  void controller.delete(req, res)
})

export default router

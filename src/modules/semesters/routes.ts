import { Router } from 'express'
import SemesterController from './controllers'

const router = Router()
const constroller = new SemesterController()

const baseUrl = '/semesters'

router.get(`${baseUrl}/all`, async (req, res) => {
  await constroller.getAll(req, res)
})

router.patch(`${baseUrl}/subjects/update/:id`, async (req, res) => {
  await constroller.updateSubject(req, res)
})

router.post(`${baseUrl}/subjects/create`, async (req, res) => {
  await constroller.createSubject(req, res)
})

router.delete(`${baseUrl}/subjects/delete/:subjectId`, async (req, res) => {
  await constroller.deleteSubject(req, res)
})

export default router

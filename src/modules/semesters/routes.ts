import { Router } from 'express'
import SemesterController from './controllers'

const router = Router()
const constroller = new SemesterController()

router.get('/all', async (req, res) => {
  await constroller.getAll(req, res)
})

router.patch('/subjects/update/:id', async (req, res) => {
  await constroller.updateSubject(req, res)
})

router.post('/subjects/create', async (req, res) => {
  await constroller.createSubject(req, res)
})

router.delete('/subjects/delete/:subjectId', async (req, res) => {
  await constroller.deleteSubject(req, res)
})

export default router

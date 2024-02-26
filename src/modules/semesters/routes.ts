import { Router } from 'express'
import SemesterController from './controllers'

const router = Router()
const constroller = new SemesterController()

const baseUrl = '/semesters'

router.get(`${baseUrl}/all`, async (req, res) => {
  await constroller.getAll(req, res)
})

export default router

import { Router } from 'express'
import ProfessrorController from './controllers'

const router = Router()
const controller = new ProfessrorController()

router.get('/', async (req, res) => {
	await controller.getAllProfessors(req, res)
})

router.post('/', async (req, res) => {
	await controller.createProfessor(req, res)
})

router.put('/:id', async (req, res) => {
	await controller.updateProfessor(req, res)
})

router.delete('/:id', async (req, res) => {
	await controller.deleteProfessor(req, res)
})

router.put('/asign/:id', async (req, res) => {
	await controller.asingSchedule(req, res)
})

router.delete('/delete-subject/:professor/:schedule', async (req, res) => {
	await controller.removeSchedule(req, res)
})

router.get('/for-print/:id', async (req, res) => {
	await controller.forPrintSchedule(req, res)
})


export default router

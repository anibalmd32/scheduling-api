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


export default router

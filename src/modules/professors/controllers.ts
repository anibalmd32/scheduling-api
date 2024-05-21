import { Request, Response } from 'express'
import { ProfessorServices } from "./services";
import { ProfessorsDTO } from './definitions';

const service = new ProfessorServices()

export default class ProfessrorController {
	async getAllProfessors(req: Request, res: Response): Promise<void> {
		try {
			const professors = await service.getProfessors()
			res.status(200).json(professors)
		} catch (error: any) {
			res.status(400).json({ error: error.message })
		}
	}

	async createProfessor(req: Request, res: Response): Promise<void> {
		const professorData = req.body as ProfessorsDTO

		try {
			await service.addProfessor(professorData);
			res.status(200).json({ message: 'success' })
		} catch (error: any) {
			res.status(400).json({ message: error.message })
		}
	}

	async updateProfessor(req: Request, res: Response): Promise<void> {
		const professorData = req.body as ProfessorsDTO
		const professorId = String(req.params.id)

		try {
			const updatedProfessor = await service.updateProfessor(professorId, professorData)
			res.status(200).json(updatedProfessor)
		} catch (error: any) {
			res.status(400).json({ error: error.message })
		}
	}

	async deleteProfessor(req: Request, res: Response): Promise<void> {
		const professorId = String(req.params.id)

		try {
			await service.deleteProfessor(professorId)
			res.status(200).json({ message: 'success' })
		} catch (error: any) {
			res.status(400).json({ error: error.message })
		}
	}

	async asingSchedule(req: Request, res: Response): Promise<void> {
		const professorId = String(req.params.id)
		const scheduleId = String(req.body.id)

		try {
			await service.asingSchedule(scheduleId, professorId)
			res.status(200).json({ message: 'success' })
		} catch (error: any) {
			res.status(400).json({ error: error.message })
		}
	}
}

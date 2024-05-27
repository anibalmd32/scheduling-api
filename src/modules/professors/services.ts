import Professors from './model';
import Schedule from '../schedules/model';
import {type ProfessorsDTO, type ProfessorSchema, type ProfessorsData} from './definitions';
import {formatEvent} from '../../libs/formatEvent';

export class ProfessorServices {
	async getProfessors(): Promise<ProfessorsData[]> {
		const professors = await Professors.find({});

		const data = await Promise.all(professors.map(async (professor) => {
			if (professor.schedule.length === 0) {
				return {
					_id: String(professor._id),
					condition: professor.condition,
					data: professor.data,
					schedule: []
				};
			} else {
				const schedules = await Promise.all(professor.schedule.map(async (scheduleId) => {
					const schedule = await Schedule.findById(scheduleId);

					if (schedule == null) {
						throw new Error('No se pudo encontrar el horario')
					}

					const scheduleEvent = formatEvent({
						_id: String(schedule._id),
						classroom: schedule.classroom,
						day: schedule.day,
						endTime: schedule.endTime,
						startTime: schedule.startTime,
						subject: schedule.subject,
						degree: schedule.degree,
						semester: schedule.semester,
						extra: {
							hourInterval: schedule.extra.hourInterval,
							subjectType: schedule.extra.subjectType
						}
					}, 'professor');

					return scheduleEvent;
				}));

				return {
					_id: String(professor._id),
					condition: professor.condition,
					data: professor.data,
					schedule: schedules
				};
			}
		}));

		return data;
	}

	async addProfessor(data: ProfessorsDTO): Promise<void> {

		const dataForAdd: ProfessorSchema = {
			condition: data.condition,
			data: data.data,
			schedule: []
		};

		const newProfessor = await Professors.create(dataForAdd);

		await newProfessor.save();
	}

	async asingSchedule(shecheduleId: string, professorId: string): Promise<void> {

		await Professors.findByIdAndUpdate(
			professorId,
			{
				$push: {
					schedule: shecheduleId
				}
			}
		);
	}

	async removeSchedule(scheduleId: string, professorId: string): Promise<void> {

		await Professors.updateOne(
			{_id: professorId},
			{
				$pull: {
					schedule: scheduleId
				}
			}
		);
	}

	async updateProfessor(professorId: string, professorData: ProfessorsDTO): Promise<ProfessorsData> {

		const updatedProfessor = await Professors.findByIdAndUpdate(
			professorId,
			{data: professorData},
			{new: true}
		);

		if (!updatedProfessor) throw new Error('No se pudo actualizar la informacion del profesor');

		return {
			_id: String(updatedProfessor?._id),
			condition: updatedProfessor.condition,
			data: updatedProfessor.data,
			schedule: updatedProfessor.schedule
		};
	}

	async deleteProfessor(professorId: string): Promise<void> {
		await Professors.findByIdAndDelete(professorId);
	}
}

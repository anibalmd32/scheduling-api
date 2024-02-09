import { Classroom } from '../models/Scheduling'
import { createWeekSchedule } from '../../utils/createWeekSchedule'

const classrooms: Record<string, 'normal' | 'laboratory' | 'pc'> = {
  'aula 12': 'normal',
  'aula 14': 'normal',
  'aula 4': 'normal',
  'aula 5': 'normal',
  'aula 17': 'normal',
  'aula 24': 'laboratory',
  'aula VAS y PC': 'pc'
}

const classroomsSeed: any[] = []

for (const room in classrooms) {
  classroomsSeed.push({
    code: room,
    category: classrooms[room],
    degrees: ['sistemas'],
    hoursAvailable: createWeekSchedule(),
    hoursBusy: []
  })
}

export async function classroomsSeeder (): Promise<void> {
  try {
    await Classroom.create(classroomsSeed)
    console.info('Classrooms has been seeding 🌱')
  } catch (error) {
    console.info(error)
  }
}

import Classrooms from '../../modules/classrooms/model'
import { type ClassroomSchema } from '../../modules/classrooms/definitions'
import { createWeekSchedule, createVoidSchedule } from '../../libs/createWeekSchedule'

const classrooms: Record<string, 'normal' | 'laboratory' | 'pc'> = {
  'aula 12': 'normal',
  'aula 14': 'normal',
  'aula 4': 'normal',
  'aula 5': 'normal',
  'aula 17': 'normal',
  'aula 24': 'laboratory',
  'aula VAS y PC': 'pc'
}

const classroomsSeed: ClassroomSchema[] = []

for (const room in classrooms) {
  classroomsSeed.push({
    code: room,
    category: classrooms[room],
    degrees: ['sistemas'],
    availability: createWeekSchedule(),
    occupied: createVoidSchedule()
  })
}

export async function classroomsSeeder (): Promise<void> {
  try {
    await Classrooms.create<ClassroomSchema>(classroomsSeed)
    console.info('Classrooms has been seeding 🌱')
  } catch (error) {
    console.info(error)
  }
}

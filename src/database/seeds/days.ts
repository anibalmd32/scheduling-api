import { Day } from '../models/Scheduling'

const days: string[] = [
  'lunes',
  'martes',
  'miercoles',
  'jueves',
  'viernes',
  'sábado'
]

const morningHours: string[] = [
  '7:00',
  '7:45',
  '8:30',
  '9:15',
  '10:00',
  '10:45',
  '11:30',
  '12:15'
]

const afternoonHours: string[] = [
  '13:00',
  '13:45',
  '14:30',
  '15:15',
  '16:00',
  '16:45',
  '17:30'
]

const daysSeed = days.map(day => ({
  name: day,
  morningHours,
  afternoonHours
}))

export async function daysSeeder (): Promise<void> {
  try {
    await Day.create(daysSeed)
    console.info('Days has been seeding 🌱')
  } catch (error) {
    console.error(error)
  } finally {
    process.exit(1)
  }
}

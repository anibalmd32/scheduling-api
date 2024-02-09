import { Day } from '../models/Scheduling'
import { createWeekSchedule } from '../../utils/createWeekSchedule'

const daysSeed = createWeekSchedule()

export async function daysSeeder (): Promise<void> {
  try {
    await Day.create(daysSeed)
    console.info('Days has been seeding 🌱')
  } catch (error) {
    console.error(error)
  }
}

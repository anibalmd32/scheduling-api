import Days from '../../modules/days/model'
import { type DaySchema } from '../../modules/days/definitions'
import { createWeekSchedule } from '../../libs/createWeekSchedule'

const daysSeed = createWeekSchedule()

export async function daysSeeder (): Promise<void> {
  try {
    await Days.create<DaySchema>(daysSeed)
    console.info('Days has been seeding 🌱')
  } catch (error) {
    console.error(error)
  }
}

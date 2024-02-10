import { morningHours } from './morningHours'
import { afternoonHours } from './afterHours'
import { weekDays } from './weekDays'

export function createWeekSchedule (): Array<{
  name: string
  morningHours: string[]
  afternoonHours: string[]
}> {
  return weekDays.map(day => ({
    name: day,
    morningHours,
    afternoonHours
  }))
}

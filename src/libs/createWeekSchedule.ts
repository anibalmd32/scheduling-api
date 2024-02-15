import { morningHours } from '../utils/morningHours'
import { afternoonHours } from '../utils/afterHours'
import { weekDays } from '../utils/weekDays'
import { type DaySchema } from '../modules/days/definitions'

export function createWeekSchedule (): DaySchema[] {
  return weekDays.map(day => ({
    name: day,
    hours: morningHours.concat(afternoonHours)
  }))
}

export function createVoidSchedule (): DaySchema[] {
  return weekDays.map(day => ({
    name: day,
    hours: []
  }))
}

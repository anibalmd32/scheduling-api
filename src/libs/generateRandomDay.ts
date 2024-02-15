import { findMindIndex } from './findMidIndex'
import { type DaySchema } from '../modules/days/definitions'

export function generateRandomDay (
  daysArr: DaySchema[],
  hourType: string
): DaySchema {
  let randomIndexDay: number
  const midIndex = findMindIndex(daysArr.length)

  if (hourType === 'theoryHours') {
    randomIndexDay = Math.random() * (midIndex - 0) + 0
    return daysArr[Math.floor(randomIndexDay)]
  } else if (hourType === 'practiceHours' || hourType === 'laboratoryHours') {
    randomIndexDay = Math.random() * (daysArr.length - midIndex) + midIndex
    return daysArr[Math.floor(randomIndexDay)]
  }

  return {
    hours: [''],
    name: ''
  }
}

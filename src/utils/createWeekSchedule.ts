export function createWeekSchedule (): Array<{
  name: string
  morningHours: string[]
  afternoonHours: string[]
}> {
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

  return days.map(day => ({
    name: day,
    morningHours,
    afternoonHours
  }))
}

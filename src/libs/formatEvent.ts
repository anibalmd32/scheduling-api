import { type ScheduleSchema, type ScheduleEvent } from '../modules/schedules/definitions'

export function formatEvent (scheduleDetails: ScheduleSchema): ScheduleEvent {
  const daysObj: Record<string, number> = {
    lunes: 18,
    martes: 19,
    miercoles: 20,
    jueves: 21,
    viernes: 22,
    sábado: 23
  }

  const dayNum = daysObj[scheduleDetails.day]
  const start = `2024-02-${dayNum}T${scheduleDetails.startTime}:00`
  const end = `2024-02-${dayNum}T${scheduleDetails.endTime}:00`

  return {
    end,
    start,
    title: scheduleDetails.subject + ' ' + scheduleDetails.extra.subjectType
  }
}

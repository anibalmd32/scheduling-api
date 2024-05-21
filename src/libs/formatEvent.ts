import { type ScheduleData, type ScheduleEvent, type ScheduleParam } from '../modules/schedules/definitions'

export function formatEvent (scheduleDetails: ScheduleData, param: ScheduleParam): ScheduleEvent {
  const daysObj: Record<string, number> = {
    lunes: 18,
    martes: 19,
    miercoles: 20,
    jueves: 21,
    viernes: 22,
    sábado: 23
  }

  const metadatadaForParam: Record<ScheduleParam, string[]> = {
    semester: ['degree', 'classroom'],
    degree: ['semester', 'classroom'],
    classroom: ['semester', 'degree'],
    professor: ['semester', 'degree', 'classroom']
  }

  const metadata = metadatadaForParam[param].map(meta => ({
    key: meta,
    value: scheduleDetails[meta]
  }))

  const dayNum = daysObj[scheduleDetails.day]
  const start = `2024-02-${dayNum}T${scheduleDetails.startTime}:00`
  const end = `2024-02-${dayNum}T${scheduleDetails.endTime}:00`

  return {
    id: scheduleDetails._id,
    end,
    start,
    title: scheduleDetails.subject,
    metadata,
    type: scheduleDetails.extra.subjectType
  }
}

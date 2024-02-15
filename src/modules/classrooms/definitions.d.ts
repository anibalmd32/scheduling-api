import { type DaySchema } from '../days/definitions'
export interface ClassroomSchema {
  code: string
  category: 'laboratory' | 'normal' | 'pc'
  degrees: string[]
  availability: DaySchema[]
  occupied: DaySchema[] | []
}

import { type DaySchema } from '../days/definitions'

export interface ClassroomSchema {
  code: string
  category: 'laboratory' | 'normal' | 'pc'
  isActive: boolean
  degrees: string[]
  availability: DaySchema[]
  occupied: DaySchema[] | []
}

export interface ClassroomDTO extends Pick<
ClassroomSchema,
'code' |
'category'
> {}

export interface ClassroomFilters extends Partial<ClassroomDTO> {
  isActive?: boolean
}

import { type DaySchema } from '../days/definitions'
export interface ClassroomSchema {
  code: string
  category: 'laboratory' | 'normal' | 'pc'
  degrees: string[]
  availability: DaySchema[]
  occupied: DaySchema[] | []
}

export interface ClassroomDTO extends Pick<
ClassroomSchema,
'code' |
'category' |
'degrees'
> {}

export interface ClassroomFilters extends Partial<ClassroomDTO> {}

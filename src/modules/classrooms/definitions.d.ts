export interface ClassroomSchema {
  code: string
  category: 'laboratory' | 'normal' | 'pc'
  degrees: string[]
  hoursAvailable: string[]
  hoursBusy: string[]
}

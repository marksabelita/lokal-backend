export enum EUserType {
  NORMAL = 'normal',
  TALENT = 'talent',
}

export interface IUserInterfaceModel {
  contactNumber: string
  firstName?: string
  lastName?: string
  userType?: string
  birthday?: string
  city?: string
  province?: string
  latitude?: number
  longitude?: number
  active?: number
}

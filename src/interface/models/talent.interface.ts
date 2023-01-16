export interface ITalentInterfaceModel {
  contactNumber: string
  fullName?: string
  category?: string
  categoryDetails?: string
  city?: string
  province?: string
  experienceDetails?: string
  rating?: number
  latitude?: number
  longitude?: number
  joinDate?: string
  profileImage?: string
}

export interface ITalentLocationQueryInterface {
  latitude: number
  longitude: number
  category?: string
  radius: number
}

export interface ITalentUpdateNewAndOldParams {
  oldData: ITalentInterfaceModel
  newData: ITalentInterfaceModel
}

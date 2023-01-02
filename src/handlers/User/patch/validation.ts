import Joi from 'joi'
import { IUserInterfaceModel } from '../../../interface/models/user.interface'

export const putUserBodyValidation = Joi.object<IUserInterfaceModel>({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  userType: Joi.string().optional(),
  birthday: Joi.string().optional(),
  city: Joi.string().optional(),
  province: Joi.string().optional(),
  latitude: Joi.number().optional(),
  longitude: Joi.number().optional(),
  active: Joi.number().optional(),
})

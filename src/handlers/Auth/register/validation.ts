import Joi from 'joi'
import { IUserInterfaceModel } from '../../../interface/models/user.interface'

export const createUserValidation = Joi.object<IUserInterfaceModel>({
  contactNumber: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  userType: Joi.string().optional(),
  birthday: Joi.string().optional(),
  city: Joi.string().optional(),
  province: Joi.string().optional(),
  latitude: Joi.number().optional(),
  longitude: Joi.number().optional(),
  active: Joi.number().optional(),
})

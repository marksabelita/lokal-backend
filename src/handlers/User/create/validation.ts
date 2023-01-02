import Joi from 'joi'
import { IUserInterfaceModel } from '../../../interface/models/user.interface'

export const createUserValidation = Joi.object<IUserInterfaceModel>({
  contactNumber: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  userType: Joi.string().required(),
  birthday: Joi.string().required(),
  city: Joi.string().required(),
  province: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  active: Joi.number().optional(),
})

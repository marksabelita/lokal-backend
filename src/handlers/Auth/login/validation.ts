import Joi from 'joi'
import { IUserInterfaceModel } from '../../../interface/models/user.interface'

export const validation = Joi.object<IUserInterfaceModel>({
  contactNumber: Joi.string().required(),
})

import Joi from 'joi'
import { IOTPInterfaceModel } from '../../../interface/models/otp.interface'

export const validation = Joi.object<IOTPInterfaceModel>({
  contactNumber: Joi.string().required(),
  otp: Joi.number().required(),
})

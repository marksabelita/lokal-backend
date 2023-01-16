import Joi from 'joi'
import { ITalentInterfaceModel } from '../../../interface/models/talent.interface'

export const putTalentBodyValidation = Joi.object<ITalentInterfaceModel>({
  fullName: Joi.string().required(),
  category: Joi.string().required(),
  categoryDetails: Joi.string().required(),
  city: Joi.string().required(),
  province: Joi.string().required(),
  experienceDetails: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
})

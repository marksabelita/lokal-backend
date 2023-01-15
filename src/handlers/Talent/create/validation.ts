import Joi from 'joi'
import { ITalentInterfaceModel } from '../../../interface/models/talent.interface'

export const createTalentValidation = Joi.object<ITalentInterfaceModel>({
  contactNumber: Joi.string().required(),
  fullName: Joi.string().required(),
  category: Joi.string().required(),
  specificCategory: Joi.string().required(),
  city: Joi.string().required(),
  province: Joi.string().required(),
  experienceDetails: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
})

import Joi from 'joi'
import { ITalentLocationQueryInterface } from '../../../interface/models/talent.interface'

export const getByLocationValidation = Joi.object<ITalentLocationQueryInterface>({
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  category: Joi.string().optional(),
  radius: Joi.string().optional(),
})

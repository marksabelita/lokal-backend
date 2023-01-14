import Joi from 'joi'
import { ICheckAuth } from '../../../interface/models/authenticate.interface'

export const validation = Joi.object<ICheckAuth>({
  token: Joi.string().required(),
})

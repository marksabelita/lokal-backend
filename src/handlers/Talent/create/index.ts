import middy from '@middy/core'
import { defaultMiddleware } from '../../../middleware/DefaultMiddleware'
import { createTalent } from '../../../functions/Talent/create'
import { EventBodyValidationMiddleware } from '../../../middleware/EventBodyValidationMiddleware'
import { createTalentValidation } from './validation'
import { CheckUserExistMiddleware } from '../../../middleware/user/CheckUserExist'

export const handler = middy(createTalent)
  .use(defaultMiddleware)
  .use(EventBodyValidationMiddleware(createTalentValidation))
  .use(CheckUserExistMiddleware())

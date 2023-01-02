import middy from '@middy/core'
import { defaultMiddleware } from '../../../middleware/DefaultMiddleware'
import { createTalent } from '../../../functions/Talent/create'
import { EventBodyValidationMiddleware } from '../../../middleware/EventBodyValidationMiddleware'
import { createTalentValidation } from './validation'

export const handler = middy(createTalent)
  .use(defaultMiddleware)
  .use(EventBodyValidationMiddleware(createTalentValidation))

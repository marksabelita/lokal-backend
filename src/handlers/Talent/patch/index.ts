import middy from '@middy/core'
import { defaultMiddleware } from '../../../middleware/DefaultMiddleware'
import { updateTalent } from '../../../functions/Talent/patch'
import { EventBodyValidationMiddleware } from '../../../middleware/EventBodyValidationMiddleware'
import { putTalentBodyValidation } from './validation'

export const handler = middy(updateTalent)
  .use(defaultMiddleware)
  .use(EventBodyValidationMiddleware(putTalentBodyValidation))

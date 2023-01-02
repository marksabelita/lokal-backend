import middy from '@middy/core'
import { defaultMiddleware } from '../../../middleware/DefaultMiddleware'
import { getTalentByLocation } from '../../../functions/Talent/getByLocation'
import { EventQueryValidationMiddleware } from '../../../middleware/EventQueryValidationMiddleware'
import { getByLocationValidation } from './validation'

export const handler = middy(getTalentByLocation)
  .use(defaultMiddleware)
  .use(EventQueryValidationMiddleware(getByLocationValidation))

import middy from '@middy/core'
import { defaultMiddleware } from '../../../middleware/DefaultMiddleware'
import { EventBodyValidationMiddleware } from '../../../middleware/EventBodyValidationMiddleware'
import { validation } from './validation'
import { authenticateOTP } from '../../../functions/Auth/authenticate'

export const handler = middy(authenticateOTP)
  .use(defaultMiddleware)
  .use(EventBodyValidationMiddleware(validation))

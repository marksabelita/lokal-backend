import middy from '@middy/core'
import { defaultMiddleware } from '../../../middleware/DefaultMiddleware'
import { EventBodyValidationMiddleware } from '../../../middleware/EventBodyValidationMiddleware'
import { validation } from './validation'
import { validateOTP } from '../../../functions/Auth/validateOTP'

export const handler = middy(validateOTP)
  .use(defaultMiddleware)
  .use(EventBodyValidationMiddleware(validation))

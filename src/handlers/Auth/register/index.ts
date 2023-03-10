import middy from '@middy/core'
import { defaultMiddleware } from '../../../middleware/DefaultMiddleware'
import { EventBodyValidationMiddleware } from '../../../middleware/EventBodyValidationMiddleware'
import { validation } from './validation'
import { registerUser } from '../../../functions/Auth/register'

export const handler = middy(registerUser)
  .use(defaultMiddleware)
  .use(EventBodyValidationMiddleware(validation))

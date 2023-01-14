import middy from '@middy/core'
import { defaultMiddleware } from '../../../middleware/DefaultMiddleware'
import { EventBodyValidationMiddleware } from '../../../middleware/EventBodyValidationMiddleware'
import { validation } from './validation'
import { loginUser } from '../../../functions/Auth/login'

export const handler = middy(loginUser)
  .use(defaultMiddleware)
  .use(EventBodyValidationMiddleware(validation))

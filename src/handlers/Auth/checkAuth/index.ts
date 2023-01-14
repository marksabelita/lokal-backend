import middy from '@middy/core'
import { defaultMiddleware } from '../../../middleware/DefaultMiddleware'
import { EventBodyValidationMiddleware } from '../../../middleware/EventBodyValidationMiddleware'
import { validation } from './validation'
import { checkAuth } from '../../../functions/Auth/checkAuth'

export const handler = middy(checkAuth)
  .use(defaultMiddleware)
  .use(EventBodyValidationMiddleware(validation))

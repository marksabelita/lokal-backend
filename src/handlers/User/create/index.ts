import middy from '@middy/core'
import { defaultMiddleware } from '../../../middleware/DefaultMiddleware'
import { createUser } from '../../../functions/Users/create'
import { EventBodyValidationMiddleware } from '../../../middleware/EventBodyValidationMiddleware'
import { createUserValidation } from './validation'

export const handler = middy(createUser)
  .use(defaultMiddleware)
  .use(EventBodyValidationMiddleware(createUserValidation))

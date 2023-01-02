import middy from '@middy/core'
import { defaultMiddleware } from '../../../middleware/DefaultMiddleware'
import { updateUser } from '../../../functions/Users/patch'
import { EventBodyValidationMiddleware } from '../../../middleware/EventBodyValidationMiddleware'
import { putUserBodyValidation } from './validation'

export const handler = middy(updateUser)
  .use(defaultMiddleware)
  .use(EventBodyValidationMiddleware(putUserBodyValidation))

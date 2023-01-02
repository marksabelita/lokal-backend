import middy from '@middy/core'
import { defaultMiddleware } from '../../../middleware/DefaultMiddleware'
import { getUser } from '../../../functions/Users/get'

export const handler = middy(getUser).use(defaultMiddleware)

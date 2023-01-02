import middy from '@middy/core'
import { defaultMiddleware } from '../../../middleware/DefaultMiddleware'
import { deleteUser } from '../../../functions/Users/delete'

export const handler = middy(deleteUser).use(defaultMiddleware)

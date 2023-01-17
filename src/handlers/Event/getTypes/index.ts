import middy from '@middy/core'
import { defaultMiddleware } from '../../../middleware/DefaultMiddleware'
import { getEventsTypes } from '../../../functions/Events/getEventsTypes'

export const handler = middy(getEventsTypes).use(defaultMiddleware)

import middy from '@middy/core'
import { defaultMiddleware } from '../../../middleware/DefaultMiddleware'
import { getEventsCategories } from '../../../functions/Events/getEventsCategories'

export const handler = middy(getEventsCategories).use(defaultMiddleware)

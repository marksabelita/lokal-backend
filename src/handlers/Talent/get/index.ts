import middy from '@middy/core'
import { defaultMiddleware } from '../../../middleware/DefaultMiddleware'
import { getTalent } from '../../../functions/Talent/get'

export const handler = middy(getTalent).use(defaultMiddleware)

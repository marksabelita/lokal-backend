import middy from '@middy/core'
import { defaultMiddleware } from '../../../middleware/DefaultMiddleware'
import { getTalentCategories } from '../../../functions/Talent/getCategories'

export const handler = middy(getTalentCategories).use(defaultMiddleware)

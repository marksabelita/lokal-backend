import middy from '@middy/core'
import { defaultMiddleware } from '../../../middleware/DefaultMiddleware'
import { deleteTalent } from '../../../functions/Talent/delete'

export const handler = middy(deleteTalent).use(defaultMiddleware)

import middy from '@middy/core'
import { defaultMiddleware } from '../../../middleware/DefaultMiddleware'
import { deleteTalentRedisRecordConsumer } from '../../functions/redis/talent/deleteTalentRedisRecord'

export const handler = middy(deleteTalentRedisRecordConsumer).use(defaultMiddleware)

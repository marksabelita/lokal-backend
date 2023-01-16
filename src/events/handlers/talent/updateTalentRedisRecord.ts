import middy from '@middy/core'
import { defaultMiddleware } from '../../../middleware/DefaultMiddleware'
import { updateTalentRedisRecordConsumer } from '../../functions/redis/talent/updateTalentRedisRecord'

export const handler = middy(updateTalentRedisRecordConsumer).use(defaultMiddleware)

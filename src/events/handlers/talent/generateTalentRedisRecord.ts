import middy from '@middy/core'
import { defaultMiddleware } from '../../../middleware/DefaultMiddleware'
import { generateTalentRedisRecordConsumer } from '../../functions/redis/talent/generateTalentRedisRecord'

export const handler = middy(generateTalentRedisRecordConsumer).use(defaultMiddleware)

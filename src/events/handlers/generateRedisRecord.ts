import middy from '@middy/core'
import { defaultMiddleware } from '../../middleware/DefaultMiddleware'
import { generateRedisRecordConsumer } from '../functions/redis/generateRedisRecord'

export const handler = middy(generateRedisRecordConsumer).use(defaultMiddleware)

import middy from '@middy/core'
import { defaultMiddleware } from '../../../middleware/DefaultMiddleware'
import { generateOTPConsumer } from '../../functions/twilio/generateOTP'

export const handler = middy(generateOTPConsumer).use(defaultMiddleware)

import type { AWS } from '@serverless/typescript'

export const registrationEvents: AWS['functions'] = {
  generateOTPEvent: {
    handler: 'src/events/handlers/generateOTP.handler',
    events: [
      {
        eventBridge: {
          eventBus: 'registration',
          pattern: {
            source: ['registration.otp'],
          },
          retryPolicy: {
            maximumEventAge: 3600,
            maximumRetryAttempts: 3,
          },
        },
      },
    ],
  },
  generateRedisRecordEvent: {
    handler: 'src/events/handlers/generateRedisRecord.handler',
    events: [
      {
        eventBridge: {
          eventBus: 'redisTalent',
          pattern: {
            source: ['redis.create.talent'],
          },
          retryPolicy: {
            maximumEventAge: 3600,
            maximumRetryAttempts: 3,
          },
        },
      },
    ],
  },
}

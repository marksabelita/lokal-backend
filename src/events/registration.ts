import type { AWS } from '@serverless/typescript'

export const registrationEvents: AWS['functions'] = {
  getTalentByLocation: {
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
}

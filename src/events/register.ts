import type { AWS } from '@serverless/typescript'
import {
  REDIS_TALENT_EVENT_KEY,
  REGISTRATION_EVENT_KEY,
  REGISTRATION_OTP_EVENT_KEY,
  REDIS_TALENT_CREATE_EVENT_KEY,
  REDIS_TALENT_DELETE_EVENT_KEY,
  REDIS_TALENT_UPDATE_EVENT_KEY,
} from '../config/conts.config'

export const registerEvents: AWS['functions'] = {
  generateOTPEvent: {
    handler: 'src/events/handlers/twillio/generateOTP.handler',
    events: [
      {
        eventBridge: {
          eventBus: REGISTRATION_EVENT_KEY,
          pattern: {
            source: [REGISTRATION_OTP_EVENT_KEY],
          },
          retryPolicy: {
            maximumEventAge: 3600,
            maximumRetryAttempts: 3,
          },
        },
      },
    ],
  },
  generateTalentRedisRecordEvent: {
    handler: 'src/events/handlers/talent/generateTalentRedisRecord.handler',
    events: [
      {
        eventBridge: {
          eventBus: REDIS_TALENT_EVENT_KEY,
          pattern: {
            source: [REDIS_TALENT_CREATE_EVENT_KEY],
          },
          retryPolicy: {
            maximumEventAge: 3600,
            maximumRetryAttempts: 3,
          },
        },
      },
    ],
  },
  deleteTalentRedisRecordEvent: {
    handler: 'src/events/handlers/talent/deleteTalentRedisRecord.handler',
    events: [
      {
        eventBridge: {
          eventBus: REDIS_TALENT_EVENT_KEY,
          pattern: {
            source: [REDIS_TALENT_DELETE_EVENT_KEY],
          },
          retryPolicy: {
            maximumEventAge: 3600,
            maximumRetryAttempts: 3,
          },
        },
      },
    ],
  },
  updateTalentRedisRecordEvent: {
    handler: 'src/events/handlers/talent/updateTalentRedisRecord.handler',
    events: [
      {
        eventBridge: {
          eventBus: REDIS_TALENT_EVENT_KEY,
          pattern: {
            source: [REDIS_TALENT_UPDATE_EVENT_KEY],
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

import { PutEventsCommand } from '@aws-sdk/client-eventbridge'
import { getEventBridgeClient } from '../database/eventBridge'
import { IOTPParams } from '../interface/otp.interface'
import { ITalentInterfaceModel } from '../interface/models/talent.interface'
import {
  REDIS_TALENT_CREATE_EVENT_KEY,
  REDIS_TALENT_EVENT_KEY,
  REGISTRATION_EVENT_KEY,
  REGISTRATION_OTP_EVENT_KEY,
} from '../config/conts.config'

export const sendOTPEvent = async (otpData: IOTPParams) => {
  const eventBridgeClient = getEventBridgeClient()
  const params = {
    Entries: [
      {
        EventBusName: REGISTRATION_EVENT_KEY,
        Source: REGISTRATION_OTP_EVENT_KEY,
        DetailType: 'RegistrationOTP',
        Detail: JSON.stringify(otpData),
      },
    ],
  }
  return await eventBridgeClient.send(new PutEventsCommand(params))
}

export const sendCreateTalentEvent = async (talents: ITalentInterfaceModel) => {
  const eventBridgeClient = getEventBridgeClient()

  const params = {
    Entries: [
      {
        EventBusName: REDIS_TALENT_EVENT_KEY,
        Source: REDIS_TALENT_CREATE_EVENT_KEY,
        DetailType: 'CreateRedisTalent',
        Detail: JSON.stringify(talents),
      },
    ],
  }
  return await eventBridgeClient.send(new PutEventsCommand(params))
}

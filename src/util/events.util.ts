import { PutEventsCommand } from '@aws-sdk/client-eventbridge'
import { getEventBridgeClient } from '../database/eventBridge'
import { IOTPParams } from '../interface/otp.interface'
import { ITalentInterfaceModel } from '../interface/models/talent.interface'

export const sendOTPEvent = async (otpData: IOTPParams) => {
  const eventBridgeClient = getEventBridgeClient()
  const params = {
    Entries: [
      {
        EventBusName: 'registration',
        Source: 'registration.otp',
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
        EventBusName: 'redisTalent',
        Source: 'redis.create.talent',
        DetailType: 'CreateRedisTalent',
        Detail: JSON.stringify(talents),
      },
    ],
  }
  return await eventBridgeClient.send(new PutEventsCommand(params))
}

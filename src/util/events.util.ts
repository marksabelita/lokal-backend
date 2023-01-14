import { PutEventsCommand } from '@aws-sdk/client-eventbridge'
import { getEventBridgeClient } from '../database/eventBridge'
import { IOTPParams } from '../interface/otp.interface'

export const sendOTPEvent = async (otpData: IOTPParams) => {
  const eventBridgeClient = getEventBridgeClient()
  const params = {
    Entries: [
      {
        EventBusName: 'registration',
        Source: 'registration.otp',
        DetailType: 'UserSignUp',
        Detail: JSON.stringify(otpData),
      },
    ],
  }
  return await eventBridgeClient.send(new PutEventsCommand(params))
}

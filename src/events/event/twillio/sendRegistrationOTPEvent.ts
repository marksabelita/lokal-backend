import { PutEventsCommand } from '@aws-sdk/client-eventbridge'
import { getEventBridgeClient } from '../../../database/eventBridge'
import { IOTPParams } from '../../../interface/otp.interface'
import { REGISTRATION_EVENT_KEY, REGISTRATION_OTP_EVENT_KEY } from '../../../config/conts.config'

export const sendOTPRegistrationEvent = async (otpData: IOTPParams) => {
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

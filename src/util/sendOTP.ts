import { PutEventsCommand } from '@aws-sdk/client-eventbridge'
import { getEventBridgeClient } from '../database/eventBridge'

export const sendOTPEvent = async () => {
  const eventBridgeClient = getEventBridgeClient()
  const params = {
    Entries: [
      {
        EventBusName: 'registration',
        Source: 'registration.otp',
        DetailType: 'UserSignUp',
        Detail: `{ "E-Mail": "some@someemail.some" }`,
      },
    ],
  }

  return await eventBridgeClient.send(new PutEventsCommand(params))
}

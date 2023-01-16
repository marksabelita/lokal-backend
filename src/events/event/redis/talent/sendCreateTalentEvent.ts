import { PutEventsCommand } from '@aws-sdk/client-eventbridge'
import {
  REDIS_TALENT_CREATE_EVENT_KEY,
  REDIS_TALENT_EVENT_KEY,
} from '../../../../config/conts.config'
import { getEventBridgeClient } from '../../../../database/eventBridge'
import { ITalentInterfaceModel } from '../../../../interface/models/talent.interface'

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

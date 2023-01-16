import { PutEventsCommand } from '@aws-sdk/client-eventbridge'
import {
  REDIS_TALENT_DELETE_EVENT_KEY,
  REDIS_TALENT_EVENT_KEY,
} from '../../../../config/conts.config'
import { getEventBridgeClient } from '../../../../database/eventBridge'
import { ITalentInterfaceModel } from '../../../../interface/models/talent.interface'

export const sendDeleteTalentEvent = async (talent: ITalentInterfaceModel) => {
  const eventBridgeClient = getEventBridgeClient()

  const params = {
    Entries: [
      {
        EventBusName: REDIS_TALENT_EVENT_KEY,
        Source: REDIS_TALENT_DELETE_EVENT_KEY,
        DetailType: 'DeleteRedisTalent',
        Detail: JSON.stringify(talent),
      },
    ],
  }
  return await eventBridgeClient.send(new PutEventsCommand(params))
}

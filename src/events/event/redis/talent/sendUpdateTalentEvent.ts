import { PutEventsCommand } from '@aws-sdk/client-eventbridge'
import {
  REDIS_TALENT_EVENT_KEY,
  REDIS_TALENT_UPDATE_EVENT_KEY,
} from '../../../../config/conts.config'
import { getEventBridgeClient } from '../../../../database/eventBridge'
import { ITalentUpdateNewAndOldParams } from '../../../../interface/models/talent.interface'

export const sendUpdateTalentEvent = async (talent: ITalentUpdateNewAndOldParams) => {
  const eventBridgeClient = getEventBridgeClient()

  const params = {
    Entries: [
      {
        EventBusName: REDIS_TALENT_EVENT_KEY,
        Source: REDIS_TALENT_UPDATE_EVENT_KEY,
        DetailType: 'UpdateRedisTalent',
        Detail: JSON.stringify(talent),
      },
    ],
  }
  return await eventBridgeClient.send(new PutEventsCommand(params))
}

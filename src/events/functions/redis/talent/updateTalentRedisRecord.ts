import { EventBridgeEvent } from 'aws-lambda'
import { ICustomContext } from '../../../../interface/context.interface'
import { ITalentUpdateNewAndOldParams } from '../../../../interface/models/talent.interface'
import { generateTalentRedisRecord } from './generateTalentRedisRecord'
import { deleteTalentRedisRecord } from './deleteTalentRedisRecord'

export const updateTalentRedisRecordConsumer = async (
  _event: EventBridgeEvent<any, any>,
  context: ICustomContext<any>
) => {
  const { logger, secrets } = context
  logger.info(`Updating redis record for talent..`)
  const detail: ITalentUpdateNewAndOldParams | null = _event.detail ? _event.detail : null
  const { newData, oldData } = detail

  const deleteResult = await deleteTalentRedisRecord(oldData, secrets)
  const addResult = await generateTalentRedisRecord(newData, secrets)

  return { statusCode: 200, body: JSON.stringify({ deleteResult, addResult }) }
}

import { EventBridgeEvent } from 'aws-lambda'
import { ICustomContext } from '../../../../interface/context.interface'
import { ITalentInterfaceModel } from '../../../../interface/models/talent.interface'
import { TALENT_DEFAULT_UNAME, TALENT_DEFAULT_GEO_DATA } from '../../../../config/conts.config'
import { getRedisClient } from '../../../../database/redisDb'
import { ISecretValues } from '../../../../interface/secrets.interface'
import { generateTalentUniqueKey } from '../../../../util/redisUniqueKey'

export const deleteTalentRedisRecordConsumer = async (
  _event: EventBridgeEvent<any, any>,
  context: ICustomContext<any>
) => {
  const { logger, secrets } = context
  logger.info(`Deleting redis record for talent..`)
  const detail: ITalentInterfaceModel | null = _event.detail ? _event.detail : null

  const deleteResult = await deleteTalentRedisRecord(detail, secrets)
  return { statusCode: 200, body: JSON.stringify(deleteResult) }
}

export const deleteTalentRedisRecord = async (
  talent: ITalentInterfaceModel,
  secrets: ISecretValues
): Promise<any> => {
  const key = generateTalentUniqueKey(talent)

  return Promise.all([
    getRedisClient(secrets).zrem(TALENT_DEFAULT_GEO_DATA, key),
    getRedisClient(secrets).hdel(TALENT_DEFAULT_UNAME, key),
  ])
}

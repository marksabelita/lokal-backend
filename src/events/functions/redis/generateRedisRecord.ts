import { EventBridgeEvent } from 'aws-lambda'
import { ICustomContext } from '../../../interface/context.interface'
import { ITalentInterfaceModel } from '../../../interface/models/talent.interface'
import { replaceCharWithDashUpperCase } from '../../../util/transformer/string.transformer'
import { TALENT_DEFAULT_UNAME, TALENT_DEFAULT_GEO_DATA } from '../../../config/conts.config'
import { getRedisClient } from '../../../database/redisDb'
import { ISecretValues } from '../../../interface/secrets.interface'

export const generateRedisRecordConsumer = async (
  _event: EventBridgeEvent<any, any>,
  context: ICustomContext<any>
) => {
  const { logger, secrets } = context
  logger.info(`Creating redis record for talent..`)
  const detail: ITalentInterfaceModel | null = _event.detail ? _event.detail : null

  const insertResult = await generateTalentRedisRecord(detail, secrets)
  return { statusCode: 200, body: JSON.stringify(insertResult) }
}

const generateTalentRedisRecord = async (
  talent: ITalentInterfaceModel,
  secrets: ISecretValues
): Promise<any> => {
  const { longitude, latitude, category, categoryDetails, rating } = talent
  const ratingData = rating ? rating : 0

  const categoryData = replaceCharWithDashUpperCase(category)
  const sCategoryData = replaceCharWithDashUpperCase(categoryDetails)

  const key = `TALENT#${categoryData}#${sCategoryData}#${ratingData}`

  return [
    getRedisClient(secrets).geoadd(TALENT_DEFAULT_GEO_DATA, latitude, longitude, key),
    getRedisClient(secrets).hset(TALENT_DEFAULT_UNAME, key, JSON.stringify(talent)),
  ]
}

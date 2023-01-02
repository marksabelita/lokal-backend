import { DEFAULT_RADIUS } from '../../config/conts.config'
import { getRedisClient } from '../../database/redisDb'
import { ICustomContext } from '../../interface/context.interface'
import { success } from '../../util/response'
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda'
import { replaceSpecCharWithDash } from '../../util/transformer/string.transformer'

export const getTalentByLocation = async (
  event: APIGatewayProxyEvent,
  context: ICustomContext<any>
): Promise<APIGatewayProxyResult> => {
  context.callbackWaitsForEmptyEventLoop = false
  const { logger } = context
  const { queryStringParameters } = event
  const { latitude, longitude, radius, category } = queryStringParameters

  const redisClient = getRedisClient()
  const RADIUS = radius ? radius : DEFAULT_RADIUS
  const QUERY_KEY = category
    ? `TALENT-${replaceSpecCharWithDash(category).toUpperCase()}`
    : `TALENT`

  await redisClient.zrem(
    QUERY_KEY,
    JSON.stringify({
      fullName: 'markSabelita',
      city: 'ANTIPOLO',
      province: 'RIZAL',
      talenId: 'TALENT#09499444389',
      rating: null,
      longitude: 14.62236,
      latitude: 121.166153,
      category: 'Construction',
    })
  )

  const data = await redisClient.georadius(QUERY_KEY, latitude, longitude, RADIUS, 'm')
  const transformData = data.map((d: string) => {
    return JSON.parse(d)
  })

  return success(logger.getTrackingCode(), 'success', transformData)
}

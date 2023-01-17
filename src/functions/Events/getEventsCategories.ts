import { success } from '../../util/response.util'
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda'
import { ICustomContext } from '../../interface/context.interface'
import { LOKAL_EVENTS_CATEGORIES_DATA } from '../../data/eventsCategory.data'

export const getEventsCategories = async (
  _event: APIGatewayProxyEvent,
  context: ICustomContext<any>
): Promise<APIGatewayProxyResult> => {
  context.callbackWaitsForEmptyEventLoop = false
  const { logger } = context
  const data = LOKAL_EVENTS_CATEGORIES_DATA

  return success(logger.getTrackingCode(), 'success', data)
}

import { success } from '../../util/response.util'
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda'
import { ICustomContext } from '../../interface/context.interface'
import { LOKAL_TALENT_CATEGORIES_DATA } from '../../data/talentsCategory.data'

export const getTalentCategories = async (
  _event: APIGatewayProxyEvent,
  context: ICustomContext<any>
): Promise<APIGatewayProxyResult> => {
  context.callbackWaitsForEmptyEventLoop = false
  const { logger } = context
  const categoryData = LOKAL_TALENT_CATEGORIES_DATA

  return success(logger.getTrackingCode(), 'success', categoryData)
}

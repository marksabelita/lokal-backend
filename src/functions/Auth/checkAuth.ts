import { ICustomContext } from '../../interface/context.interface'
import { error, success } from '../../util/response.util'
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda'
import { checkJWTToken } from '../../util/auth.utils'
import { ICheckAuth } from '../../interface/models/authenticate.interface'
import { HTTP_CODE } from '../../interface/enums/http'

export const checkAuth = async (
  event: APIGatewayProxyEvent,
  context: ICustomContext<any>
): Promise<APIGatewayProxyResult> => {
  const { logger, secrets } = context

  try {
    context.callbackWaitsForEmptyEventLoop = false
    const { body } = event
    const params: ICheckAuth = JSON.parse(body)

    const user = await checkJWTToken(secrets, params.token)
    return success(logger.getTrackingCode(), 'success', { user })
  } catch (e) {
    return error(HTTP_CODE.UNAUTHORIZED, logger.getTrackingCode(), 'Unauthorized', {})
  }
}

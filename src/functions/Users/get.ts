import { ICustomContext } from '../../interface/context.interface'
import { UserModel } from '../../models/user.models'
import { UserService } from '../../services/user.service'
import { success } from '../../util/response.util'
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda'

export const getUser = async (
  event: APIGatewayProxyEvent,
  context: ICustomContext<any>
): Promise<APIGatewayProxyResult> => {
  context.callbackWaitsForEmptyEventLoop = false
  const { logger } = context
  const { pathParameters } = event
  const { contactNumber } = pathParameters
  const userModel = new UserModel({ contactNumber })
  const userService = new UserService(userModel)

  const result = await userService.getUser()
  return success(logger.getTrackingCode(), 'success', { result })
}

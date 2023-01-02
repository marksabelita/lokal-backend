import { ICustomContext } from '../../interface/context.interface'
import { IUserInterfaceModel } from '../../interface/models/user.interface'
import { UserModel } from '../../models/user.models'
import { UserService } from '../../services/user.service'
import { success } from '../../util/response'
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda'

export const createUser = async (
  event: APIGatewayProxyEvent,
  context: ICustomContext<any>
): Promise<APIGatewayProxyResult> => {
  context.callbackWaitsForEmptyEventLoop = false
  const { logger } = context
  const { body } = event
  const user: IUserInterfaceModel = JSON.parse(body)
  const userModel = new UserModel({ ...user, active: 1 })
  const userService = new UserService(userModel)

  const result = await userService.createUser()
  return success(logger.getTrackingCode(), 'success', { result })
}

import { ICustomContext } from '../../interface/context.interface'
import { IUserInterfaceModel } from '../../interface/models/user.interface'
import { UserModel } from '../../models/user.models'
import { UserService } from '../../services/user.service'
import { success } from '../../util/response'
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda'

export const deleteUser = async (
  event: APIGatewayProxyEvent,
  context: ICustomContext<any>
): Promise<APIGatewayProxyResult> => {
  context.callbackWaitsForEmptyEventLoop = false
  const { logger } = context
  const { pathParameters, body } = event
  const { contactNumber } = pathParameters
  const updateDetails = JSON.parse(body)
  const userData: IUserInterfaceModel = { ...updateDetails, contactNumber: contactNumber }

  const userModel = new UserModel(userData)
  const userService = new UserService(userModel)

  const result = await userService.deleteUser()
  return success(logger.getTrackingCode(), 'success', { result })
}

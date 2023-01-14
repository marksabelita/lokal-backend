import { ICustomContext } from '../../interface/context.interface'
import { success } from '../../util/response.util'
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda'
import { OTPModel } from '../../models/otp.models'
import { OTPService } from '../../services/otp.service'
import { IOTPInterfaceModel } from '../../interface/models/otp.interface'
import { UserModel } from '../../models/user.models'
import { UserService } from '../../services/user.service'
import { generateJWTToken } from '../../util/auth.utils'

export const authenticateOTP = async (
  event: APIGatewayProxyEvent,
  context: ICustomContext<any>
): Promise<APIGatewayProxyResult> => {
  context.callbackWaitsForEmptyEventLoop = false
  const { logger, secrets } = context
  const { body } = event
  const params: IOTPInterfaceModel = JSON.parse(body)
  const otpModel = new OTPModel({ contactNumber: params.contactNumber, otp: params.otp })
  const otpService = new OTPService(otpModel)
  await otpService.getOTP()

  const user = await getUser(params.contactNumber)
  const token = await generateJWTToken(secrets, user)

  return success(logger.getTrackingCode(), 'success', { token })
}

const getUser = async (contactNumber): Promise<UserModel> => {
  const userModel = new UserModel({ contactNumber: contactNumber, isVerified: true })
  const userService = new UserService(userModel)
  await userService.updateUser()
  return userService.getUser()
}

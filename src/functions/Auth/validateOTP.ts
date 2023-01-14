import { ICustomContext } from '../../interface/context.interface'
import { success } from '../../util/response.util'
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda'
import { OTPModel } from '../../models/otp.models'
import { OTPService } from '../../services/otp.service'
import { IOTPInterfaceModel } from '../../interface/models/otp.interface'
import { UserModel } from '../../models/user.models'
import { UserService } from '../../services/user.service'

export const validateOTP = async (
  event: APIGatewayProxyEvent,
  context: ICustomContext<any>
): Promise<APIGatewayProxyResult> => {
  context.callbackWaitsForEmptyEventLoop = false
  let updateUser: Promise<UserModel>
  const { logger } = context
  const { body } = event
  const params: IOTPInterfaceModel = JSON.parse(body)
  const otpModel = new OTPModel({ contactNumber: params.contactNumber, otp: params.otp })
  const otpService = new OTPService(otpModel)
  const otpExist = await otpService.getOTP()

  if (otpExist) {
    updateUser = verifyUser(params.contactNumber)
  }

  return success(logger.getTrackingCode(), 'success', { success: true, updateUser })
}

const verifyUser = async (contactNumber): Promise<UserModel> => {
  const userModel = new UserModel({ contactNumber: contactNumber, isVerified: true })
  const userService = new UserService(userModel)
  return await userService.updateUser()
}

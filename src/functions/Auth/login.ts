import { ICustomContext } from '../../interface/context.interface'
import { IUserInterfaceModel } from '../../interface/models/user.interface'
import { UserModel } from '../../models/user.models'
import { UserService } from '../../services/user.service'
import { success } from '../../util/response.util'
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda'
import { sendOTPEvent } from '../../util/events.util'
import { generateRandomOTP } from '../../util/generators.util'
import { IOTPParams } from '../../interface/otp.interface'
import { OTPModel } from '../../models/otp.models'
import { DEFAULT_TTL } from '../../config/conts.config'
import { OTPService } from '../../services/otp.service'

export const loginUser = async (
  event: APIGatewayProxyEvent,
  context: ICustomContext<any>
): Promise<APIGatewayProxyResult> => {
  context.callbackWaitsForEmptyEventLoop = false
  const { logger } = context
  const { body } = event
  let sendOTPResult

  const user: IUserInterfaceModel = JSON.parse(body)
  const userModel = new UserModel({ ...user })
  const userService = new UserService(userModel)
  const createUserResult = await userService.getUser()

  if (createUserResult && createUserResult.user) {
    const otpData = await createOTPRecord(user.contactNumber)
    sendOTPResult = await sendOTPEvent(otpData)
  }

  return success(logger.getTrackingCode(), 'success', { sendOTPResult })
}

const createOTPRecord = async (contactNumber: string): Promise<IOTPParams> => {
  const otp = generateRandomOTP()
  const otpModel = new OTPModel({ contactNumber, otp, ttl: DEFAULT_TTL, purpose: 'Login' })
  const otpService = new OTPService(otpModel)
  await otpService.createOTP()

  return { otp, contactNumber }
}

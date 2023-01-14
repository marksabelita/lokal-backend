import { ICustomContext } from '../../interface/context.interface'
import { success } from '../../util/response.util'
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda'
import { OTPModel } from '../../models/otp.models'
import { OTPService } from '../../services/otp.service'
import { IOTPInterfaceModel } from '../../interface/models/otp.interface'

export const validateOTP = async (
  event: APIGatewayProxyEvent,
  context: ICustomContext<any>
): Promise<APIGatewayProxyResult> => {
  context.callbackWaitsForEmptyEventLoop = false
  const { logger } = context
  const { body } = event
  const params: IOTPInterfaceModel = JSON.parse(body)
  const otpModel = new OTPModel({ contactNumber: params.contactNumber, otp: params.otp })
  const otpService = new OTPService(otpModel)
  await otpService.getOTP()

  return success(logger.getTrackingCode(), 'success', { success: true })
}

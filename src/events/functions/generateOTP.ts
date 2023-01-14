import { EventBridgeEvent } from 'aws-lambda'
import { ICustomContext } from '../../interface/context.interface'
import { IOTPParams } from '../../interface/otp.interface'
import { sendTwillioSMS } from '../../util/sms'
import { ISMSTwillioParams } from '../../interface/sms.interface'

export const generateOTPConsumer = async (
  _event: EventBridgeEvent<any, any>,
  context: ICustomContext<any>
) => {
  const { logger } = context
  const detail: IOTPParams | null = _event.detail ? _event.detail : null

  logger.info(`Sending OTP to ${detail?.contactNumber} detail`)

  const otpMessage: ISMSTwillioParams = {
    body: `Your OTP is: ${detail.otp}. This code is valid for the next 5 minutes. Please enter this code to verify your account.`,
    to: detail.contactNumber,
  }

  const twillioResult = await sendTwillioSMS(otpMessage)
  return { statusCode: 200, body: JSON.stringify(twillioResult) }
}

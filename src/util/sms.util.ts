import { Twilio } from 'twilio'
import { ISMSTwillioParams } from '../interface/sms.interface'
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message'
import { ISecretValues } from '../interface/secrets.interface'

export const sendTwillioSMS = (
  data: ISMSTwillioParams,
  secrets: ISecretValues
): Promise<MessageInstance> => {
  const { TWILIO_SID, TWILIO_TOKEN, TWILIO_CONTACT } = secrets

  const twilioParams = data && data.from ? data : { ...data, from: `${TWILIO_CONTACT}` }
  const client = new Twilio(TWILIO_SID, TWILIO_TOKEN)
  return client.messages.create(twilioParams)
}

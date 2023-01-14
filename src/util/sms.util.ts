import { Twilio } from 'twilio'
import { ISMSTwillioParams } from '../interface/sms.interface'
import { ENVIRONMENT_VARIABLES, getEnvironmentVariableValue } from './environments.util'
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message'

export const sendTwillioSMS = (data: ISMSTwillioParams): Promise<MessageInstance> => {
  const TWILIO_SID = getEnvironmentVariableValue(ENVIRONMENT_VARIABLES.TWILIO_SID)
  const TWILIO_TOKEN = getEnvironmentVariableValue(ENVIRONMENT_VARIABLES.TWILIO_TOKEN)
  const TWILIO_CONTACT = getEnvironmentVariableValue(ENVIRONMENT_VARIABLES.TWILIO_CONTACT)

  const twilioParams = data && data.from ? data : { ...data, from: `${TWILIO_CONTACT}` }
  const client = new Twilio(TWILIO_SID, TWILIO_TOKEN)
  return client.messages.create(twilioParams)
}

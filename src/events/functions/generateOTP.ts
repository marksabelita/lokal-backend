import { EventBridgeEvent } from 'aws-lambda'
import { ICustomContext } from '../../interface/context.interface'

export const generateOTPConsumer = async (
  _event: EventBridgeEvent<any, any>,
  _context: ICustomContext<any>
) => {
  console.log(_event)
  // console.log(event)
  // const eventBridgeClient = getEventBridgeClient()
  // eventBridgeClient.
  // const logger = context.logger
  // logger.info(event)
  /*
    {
      EventBusName: 'marketing',
      Source: 'acme.newsletter.campaign',
      DetailType: 'UserSignUp',
      Detail: `{ "E-Mail": "some@someemail.some" }`,
    }
  */
  return { statusCode: 200, body: JSON.stringify(_event) }
}

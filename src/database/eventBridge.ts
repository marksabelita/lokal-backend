import { checkIsOffline } from '../util/checker.util'
import { ENVIRONMENT_VARIABLES, getEnvironmentVariableValue } from '../util/environments.util'
import { EventBridgeClient } from '@aws-sdk/client-eventbridge'
const client = null

export const getEventBridgeClient = (): EventBridgeClient => {
  if (client) return client
  const region = getEnvironmentVariableValue(ENVIRONMENT_VARIABLES.REGION)

  const eventbridgeLocalEndpoint = getEnvironmentVariableValue(
    ENVIRONMENT_VARIABLES.EVENT_BRIDGE_LOCAL_ENDPOINT
  )

  const isOffline = checkIsOffline()

  const connectionParams = isOffline
    ? {
        endpoint: eventbridgeLocalEndpoint,
        region,
      }
    : {
        region,
      }

  return new EventBridgeClient(connectionParams)
}

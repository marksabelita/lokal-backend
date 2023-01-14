import { ENVIRONMENT_VARIABLES, getEnvironmentVariableValue } from '../util/environments.util'
import { EventBridgeClient } from '@aws-sdk/client-eventbridge'
const client = null

export const getEventBridgeClient = (): EventBridgeClient => {
  if (client) return client
  const region = getEnvironmentVariableValue(ENVIRONMENT_VARIABLES.REGION)
  const isOffline = getEnvironmentVariableValue(ENVIRONMENT_VARIABLES.IS_OFFLINE)
  const eventbridgeLocalEndpoint = getEnvironmentVariableValue(
    ENVIRONMENT_VARIABLES.EVENT_BRIDGE_LOCAL_ENDPOINT
  )

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

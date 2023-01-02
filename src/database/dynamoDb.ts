import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { ENVIRONMENT_VARIABLES, getEnvironmentVariableValue } from '../util/environments'
let client = null

export const getDynamoDBClient = (): DynamoDBClient => {
  if (client) return client
  const offlineVar = getEnvironmentVariableValue(ENVIRONMENT_VARIABLES.IS_OFFLINE)
  const endpoint = getEnvironmentVariableValue(ENVIRONMENT_VARIABLES.DYNAMODB_LOCAL_ENDPOINT)
  const region = getEnvironmentVariableValue(ENVIRONMENT_VARIABLES.REGION)
  const isOffline = offlineVar.toLowerCase() === 'true'

  if (isOffline) {
    return new DynamoDBClient({
      region,
      endpoint,
    })
  }

  client = new DynamoDBClient({ region })
  return client
}

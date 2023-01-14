import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { ENVIRONMENT_VARIABLES, getEnvironmentVariableValue } from '../util/environments.util'
import { checkIsOffline } from '../util/checker.util'
let client = null

export const getDynamoDBClient = (): DynamoDBClient => {
  if (client) return client
  const endpoint = getEnvironmentVariableValue(ENVIRONMENT_VARIABLES.DYNAMODB_LOCAL_ENDPOINT)
  const region = getEnvironmentVariableValue(ENVIRONMENT_VARIABLES.REGION)
  const isOffline = checkIsOffline()

  if (isOffline) {
    return new DynamoDBClient({
      region,
      endpoint,
    })
  }

  client = new DynamoDBClient({ region })
  return client
}

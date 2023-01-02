import * as AWS from '@aws-sdk/client-secrets-manager'

import { ENVIRONMENT_VARIABLES, getEnvironmentVariableValue } from './environments'
import { Logger } from './log'

interface SecretValues {
  MONGO_DB_CONN: string
  PROCORE_CLIENT_ID: string
  PROCORE_CLIENT_SECRET: string
  GLOBAL_TOKEN_SECRET: string
  MONGO_DB_ATLAS_PUBLIC_KEY: string
  MONGO_DB_ATLAS_PRIVATE_KEY: string
  COGNITO_VTCLIENT_ID: string
  COGNITO_VTCLIENT_SECRET: string
  GLOBAL_TOKEN_X_API_KEY: string
  JIRA_AUTH_BASIC: string
}

export class SecretVariables {
  MONGO_DB_CONN: string
  PROCORE_CLIENT_ID: string
  PROCORE_CLIENT_SECRET: string
  GLOBAL_TOKEN_SECRET: string
  MONGO_DB_ATLAS_PUBLIC_KEY: string
  MONGO_DB_ATLAS_PRIVATE_KEY: string
  COGNITO_VTCLIENT_ID: string
  COGNITO_VTCLIENT_SECRET: string
  GLOBAL_TOKEN_X_API_KEY: string
  JIRA_AUTH_BASIC: string

  constructor(params: SecretValues) {
    this.MONGO_DB_CONN = params.MONGO_DB_CONN
    this.PROCORE_CLIENT_ID = params.PROCORE_CLIENT_ID
    this.PROCORE_CLIENT_SECRET = params.PROCORE_CLIENT_SECRET
    this.GLOBAL_TOKEN_SECRET = params.GLOBAL_TOKEN_SECRET
    this.MONGO_DB_ATLAS_PUBLIC_KEY = params.MONGO_DB_ATLAS_PUBLIC_KEY
    this.MONGO_DB_ATLAS_PRIVATE_KEY = params.MONGO_DB_ATLAS_PRIVATE_KEY
    this.COGNITO_VTCLIENT_ID = params.COGNITO_VTCLIENT_ID
    this.COGNITO_VTCLIENT_SECRET = params.COGNITO_VTCLIENT_SECRET
    this.GLOBAL_TOKEN_X_API_KEY = params.GLOBAL_TOKEN_X_API_KEY
    this.JIRA_AUTH_BASIC = params.JIRA_AUTH_BASIC
  }

  public static async initiliaze(_logger: Logger): Promise<SecretVariables> {
    const region = getEnvironmentVariableValue(ENVIRONMENT_VARIABLES.REGION_AWS)
    const secretId = getEnvironmentVariableValue(ENVIRONMENT_VARIABLES.SECRET_ID)
    const secretClient = new AWS.SecretsManagerClient({
      region,
    })
    const command = new AWS.GetSecretValueCommand({
      SecretId: secretId,
    })
    const result = await secretClient.send(command)
    const values = JSON.parse(result.SecretString)

    secretClient.destroy()

    return new SecretVariables(values)
  }
}

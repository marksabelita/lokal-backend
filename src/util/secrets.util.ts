import * as AWS from '@aws-sdk/client-secrets-manager'
import { ENVIRONMENT_VARIABLES, getEnvironmentVariableValue } from './environments.util'
import { ICustomContext } from '../interface/context.interface'
import { ISecretValues } from '../interface/secrets.interface'
import { checkIsOffline } from './checker.util'
import { readFileSync } from 'fs'

export class SecretVariables {
  PUBLIC_KEY: string
  PRIVATE_KEY: string
  context: ICustomContext

  constructor(context: ICustomContext) {
    this.context = context
  }

  public async initiliaze(): Promise<ISecretValues> {
    const isOffline = checkIsOffline()

    const values = isOffline ? await this.getLocalSecretKeys() : await this.getSecretManagerKey()
    return values
  }

  private async getLocalSecretKeys() {
    const localSecretPath = getEnvironmentVariableValue(ENVIRONMENT_VARIABLES.LOCAL_SECRET_PATH)
    const [PUBLIC_KEY, PRIVATE_KEY, TWILLIO_KEY] = await Promise.all([
      readFileSync(`${localSecretPath}/jwtRS256.key.pub`, 'utf8'),
      readFileSync(`${localSecretPath}/jwtRS256.key`, 'utf8'),
      readFileSync(`${localSecretPath}/twillio.json`, 'utf8'),
    ])

    return {
      PUBLIC_KEY,
      PRIVATE_KEY,
      ...JSON.parse(TWILLIO_KEY),
    }
  }

  private async getSecretManagerKey() {
    const region = getEnvironmentVariableValue(ENVIRONMENT_VARIABLES.REGION)
    const secretId = getEnvironmentVariableValue(ENVIRONMENT_VARIABLES.SECRET_ID)

    const secretClient = new AWS.SecretsManagerClient({
      region,
    })

    const command = new AWS.GetSecretValueCommand({ SecretId: secretId })

    const result = await secretClient.send(command)
    const values = JSON.parse(result.SecretString)
    secretClient.destroy()
    return values
  }
}

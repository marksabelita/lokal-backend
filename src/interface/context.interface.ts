import { Context } from 'aws-lambda'
import { SecretVariables } from '../util/secrets.util'
import { ENVIRONMENTS } from '../util/environments.util'
import { Logger } from '../util/log.util'
import { IGlobalTokenPayload } from './auth.interface'

export interface ICustomContext<Event = any, Query = any> extends Context {
  logger: Logger
  env: ENVIRONMENTS
  body: Event
  query: Query
  secrets: SecretVariables
  accessToken: string
  eventParams: any
  clientId: string
  customDbName?: string
  connectedDbName?: string
  globalTokenPayload: IGlobalTokenPayload
}

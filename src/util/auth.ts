import { Logger } from './log'
import jwt from 'jsonwebtoken'

export class Auth<TokenPayloadType = Record<string, any>> {
  private logger: Logger
  private token: string
  private secret: string
  constructor(logger: Logger, token: string, secretKey: string) {
    this.logger = logger
    this.token = token
    this.secret = secretKey
  }

  async verify(): Promise<TokenPayloadType> {
    this.logger.debug(`Verifying token: ${this.token}`)
    const data = jwt.verify(this.token, this.secret)
    return data as TokenPayloadType
  }
}

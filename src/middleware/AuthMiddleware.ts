import { ICustomContext } from '../interface/context.interface'
import { error } from '../util/response'
import { HTTP_CODE } from '../interface/enums/http'
import { IGlobalTokenPayload } from '../interface/auth.interface'
import { Auth } from '../util/auth'

export const AuthMiddleware = () => {
  const before = async (request) => {
    const context: ICustomContext = request.context
    const { headers, requestContext } = request.event
    const { logger } = context
    logger.debug(`Initializing auth middleware`)

    try {
      const authHeader: string | undefined = headers.Authorization
      const [_, token] = authHeader.split(' ')

      if (requestContext.accountId == 'offlineContext_accountId') {
        logger.debug(`Authorization header to check: ${authHeader}`)

        if (authHeader) {
          if (authHeader.startsWith('Bearer ')) {
            const auth = new Auth<IGlobalTokenPayload>(
              logger,
              token,
              context.secrets.GLOBAL_TOKEN_SECRET
            )

            context.globalTokenPayload = await auth.verify()
            context.globalTokenPayload.userId = context.globalTokenPayload.userId.trim()
            context.globalTokenPayload.authToken = token
            return
          }
        }
      } else {
        logger.debug(`Getting Authorization details from authrizer`)
        context.globalTokenPayload = requestContext.authorizer
        context.globalTokenPayload.userId = requestContext.authorizer.userId
        context.globalTokenPayload.authToken = token
        return
      }

      return error(HTTP_CODE.UNAUTHORIZED, logger.getTrackingCode(), 'Error processing Auth token')
    } catch (e) {
      return error(HTTP_CODE.UNAUTHORIZED, logger.getTrackingCode(), 'Error processing Auth token')
    }
  }

  const onError = async (request) => {
    const { logger } = request.context
    logger.error(`Failed to initialize AuthMiddleware`)
    return error(
      HTTP_CODE.INTERNAL_SERVER_ERROR,
      logger.getTrackingCode(),
      request.error?.message ?? ''
    )
  }

  return {
    before,
    onError,
  }
}

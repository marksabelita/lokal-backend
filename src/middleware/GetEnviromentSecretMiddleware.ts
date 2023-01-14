import { HTTP_CODE } from '../interface/enums/http'
import { ENVIRONMENT_VARIABLES, getEnvironmentVariableValue } from '../util/environments.util'
import { error } from '../util/response.util'
import { SecretVariables } from '../util/secrets.util'

export const GetEnviromentSecretMiddleware = () => {
  const before = async (request) => {
    const { logger } = request.context
    logger.info('GetEnviromentSecretMiddleware was ran.')
    const env = getEnvironmentVariableValue(ENVIRONMENT_VARIABLES.ENV)
    logger.info(`INIT-ENV, ${env}`)
    const secretVariables = new SecretVariables(request.context)
    request.context.secrets = await secretVariables.initiliaze()
  }

  const onError = async (request) => {
    const { logger } = request.context
    logger.error(`Failed to initialize GetEnvironmentSecretMiddleware`)
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

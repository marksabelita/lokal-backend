import { HTTP_CODE } from '../interface/enums/http'
import { ENVIRONMENT_VARIABLES, getEnvironmentVariableValue } from '../util/environments'
import { error } from '../util/response'
import { SecretVariables } from '../util/secrets'

export const GetEnviromentSecretMiddleware = () => {
  const before = async (request) => {
    const { logger } = request.context
    logger.info('GetEnviromentSecretMiddleware was ran.')
    const env = getEnvironmentVariableValue(ENVIRONMENT_VARIABLES.ENV)
    logger.info(`INIT-ENV, ${env}`)

    request.context.secrets = await SecretVariables.initiliaze(logger)
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

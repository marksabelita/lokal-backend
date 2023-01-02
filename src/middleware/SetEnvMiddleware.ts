import { ICustomContext } from '../interface/context.interface'
import { HTTP_CODE } from '../interface/enums/http'
import {
  ENVIRONMENTS,
  ENVIRONMENT_VARIABLES,
  getEnvironmentVariableValue,
} from '../util/environments'
import { error } from '../util/response'

export const SetEnvMiddleware = () => {
  const before = async (request) => {
    const context: ICustomContext = request.context
    const { logger } = context

    logger.info('Set logger middleware')
    request.context.env = getEnvironmentVariableValue(ENVIRONMENT_VARIABLES.ENV) as ENVIRONMENTS
  }

  const onError = async (request) => {
    const { logger } = request.context
    logger.error(`Failed to initialize SetEnvMiddleware`)
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

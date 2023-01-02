import { HTTP_CODE } from '../interface/enums/http'
import { Logger } from '../util/log'
import { error } from '../util/response'
const logger = new Logger()

export const LoggerMiddleware = () => {
  const before = async (request) => {
    logger.info('Set logger middleware')
    request.context.logger = logger
  }

  const onError = async (request) => {
    logger.error(`Error initialiazing LoggerMiddleware`)
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

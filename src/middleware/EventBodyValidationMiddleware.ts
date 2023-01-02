import { ICustomContext } from '../interface/context.interface'
import { error } from '../util/response'
import { AsyncValidationOptions, Schema } from 'joi'
import { HTTP_CODE } from '../interface/enums/http'

export const EventBodyValidationMiddleware = (
  schema: Schema,
  options: AsyncValidationOptions = {}
) => {
  const before = async (request) => {
    try {
      const context: ICustomContext = request.context
      const { body: eventBody } = request.event
      const { logger } = context

      const body = eventBody ?? '{}'

      logger.info(`Validating Event Body: ${body}`)
      await schema.validateAsync(JSON.parse(body), options)
    } catch (e) {
      return error(HTTP_CODE.BAD_REQUEST, e.message, e?.details)
    }
  }

  const onError = async (request) => {
    const { logger } = request.context
    logger.error(`Failed to initialize EventBodyValidationMiddleware`)
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

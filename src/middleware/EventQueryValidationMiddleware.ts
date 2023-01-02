import { ICustomContext } from '../interface/context.interface'
import { error } from '../util/response'
import { AsyncValidationOptions, Schema } from 'joi'
import { HTTP_CODE } from '../interface/enums/http'

export const EventQueryValidationMiddleware = (
  schema: Schema,
  options: AsyncValidationOptions = {}
) => {
  const before = async (request) => {
    try {
      const context: ICustomContext = request.context
      const { queryStringParameters } = request.event
      const { logger } = context

      const query = queryStringParameters ?? {}

      logger.info(`Validating Event Query: ${JSON.stringify(query)}`)
      const data = await schema.validateAsync(query, options)
      context.query = data
    } catch (e) {
      return error(HTTP_CODE.BAD_REQUEST, e.message, e?.details)
    }
  }

  const onError = async (request) => {
    const { logger } = request.context
    logger.error(`Failed to initialize EventQueryValidationMiddleware`)
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

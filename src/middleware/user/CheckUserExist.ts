import { ICustomContext } from '../../interface/context.interface'
import { error } from '../../util/response.util'
import { HTTP_CODE } from '../../interface/enums/http'
import { UserModel } from '../../models/user.models'
import { UserService } from '../../services/user.service'
import { ITalentInterfaceModel } from '../../interface/models/talent.interface'

export const CheckUserExistMiddleware = () => {
  const before = async (request) => {
    try {
      const context: ICustomContext = request.context
      const { body } = request.event
      const talent: ITalentInterfaceModel = JSON.parse(body)
      const userModel = new UserModel({ contactNumber: talent.contactNumber })
      const userService = new UserService(userModel)

      await userService.getUser()
      const { logger } = context
      logger.debug(`Initializing auth middleware`)
    } catch (e) {
      return error(HTTP_CODE.BAD_REQUEST, e.message, e?.details)
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

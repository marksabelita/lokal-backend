import { ICustomContext } from '../../interface/context.interface'
import { error } from '../../util/response.util'
import { HTTP_CODE } from '../../interface/enums/http'
import { ITalentInterfaceModel } from '../../interface/models/talent.interface'
import { TalentModel } from '../../models/talent.models'
import { TalentService } from '../../services/talent.service'

export const CheckUserExistMiddleware = () => {
  const before = async (request) => {
    try {
      const context: ICustomContext = request.context
      const { body } = request.event
      const talent: ITalentInterfaceModel = JSON.parse(body)
      const talentModel = new TalentModel(talent)
      const talentService = new TalentService(talentModel)

      await talentService.getTalent()
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

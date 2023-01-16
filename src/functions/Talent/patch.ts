import { sendUpdateTalentEvent } from '../../events/event/redis/talent/sendUpdateTalentEvent'
import { ICustomContext } from '../../interface/context.interface'
import {
  ITalentInterfaceModel,
  ITalentUpdateNewAndOldParams,
} from '../../interface/models/talent.interface'
import { TalentModel } from '../../models/talent.models'
import { TalentService } from '../../services/talent.service'
import { success } from '../../util/response.util'
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda'

export const updateTalent = async (
  event: APIGatewayProxyEvent,
  context: ICustomContext<any>
): Promise<APIGatewayProxyResult> => {
  context.callbackWaitsForEmptyEventLoop = false
  const { logger } = context
  const { pathParameters, body } = event
  const { contactNumber } = pathParameters
  const updateDetails = JSON.parse(body)
  const talentData: ITalentInterfaceModel = { ...updateDetails, contactNumber: contactNumber }
  const talentModel = new TalentModel(talentData)
  const talentService = new TalentService(talentModel)

  const oldTalentData = await talentService.getTalentByContact()
  const updateResult = await talentService.updateTalent()

  const updatedData = { ...updateDetails, oldTalentData }
  const dataToUpdate: ITalentUpdateNewAndOldParams = {
    oldData: oldTalentData.talent,
    newData: updatedData,
  }

  const sendDeleteTalentEventResult = await sendUpdateTalentEvent(dataToUpdate)
  return success(logger.getTrackingCode(), 'success', { updateResult, sendDeleteTalentEventResult })
}

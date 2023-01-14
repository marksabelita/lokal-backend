import { ICustomContext } from '../../interface/context.interface'
import { ITalentInterfaceModel } from '../../interface/models/talent.interface'
import { TalentModel } from '../../models/talent.models'
import { TalentService } from '../../services/talent.service'
import { success } from '../../util/response.util'
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda'

export const deleteTalent = async (
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

  const result = await talentService.deleteTalent()
  return success(logger.getTrackingCode(), 'success', { result })
}

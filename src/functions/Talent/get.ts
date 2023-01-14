import { ICustomContext } from '../../interface/context.interface'
import { TalentModel } from '../../models/talent.models'
import { TalentService } from '../../services/talent.service'
import { success } from '../../util/response.util'
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda'

export const getTalent = async (
  event: APIGatewayProxyEvent,
  context: ICustomContext<any>
): Promise<APIGatewayProxyResult> => {
  context.callbackWaitsForEmptyEventLoop = false
  const { logger } = context
  const { pathParameters } = event
  const { contactNumber } = pathParameters

  const talentModel = new TalentModel({ contactNumber })
  const talentService = new TalentService(talentModel)

  const result = await talentService.getTalent()
  return success(logger.getTrackingCode(), 'success', { result })
}

import { ICustomContext } from '../../interface/context.interface'
import { ITalentInterfaceModel } from '../../interface/models/talent.interface'
import { TalentModel } from '../../models/talent.models'
import { TalentService } from '../../services/talent.service'
import { success } from '../../util/response'
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda'

export const createTalent = async (
  event: APIGatewayProxyEvent,
  context: ICustomContext<any>
): Promise<APIGatewayProxyResult> => {
  context.callbackWaitsForEmptyEventLoop = false
  const { logger } = context
  const { body } = event
  const talent: ITalentInterfaceModel = JSON.parse(body)
  const talentModel = new TalentModel({ ...talent, rating: null })
  const talentService = new TalentService(talentModel)

  const result = await talentService.createTalent()
  return success(logger.getTrackingCode(), 'success', { result })
}

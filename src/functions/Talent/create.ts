import { ICustomContext } from '../../interface/context.interface'
import { ITalentInterfaceModel } from '../../interface/models/talent.interface'
import { TalentModel } from '../../models/talent.models'
import { TalentService } from '../../services/talent.service'
import { sendCreateTalentEvent } from '../../util/events.util'
import { success } from '../../util/response.util'
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

  const createTalentResult = await talentService.createTalent()
  const sendEvent = await sendCreateTalentEvent(talent)
  return success(logger.getTrackingCode(), 'success', { createTalentResult, sendEvent })
}

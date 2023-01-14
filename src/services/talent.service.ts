/* eslint-disable no-console */
import { getDynamoDBClient } from '../database/dynamoDb'
import { getRedisClient } from '../database/redisDb'
import { TalentModel } from '../models/talent.models'
import { ENVIRONMENT_VARIABLES, getEnvironmentVariableValue } from '../util/environments'
import {
  UpdateItemCommand,
  GetItemCommand,
  DynamoDBClient,
  PutItemCommand,
} from '@aws-sdk/client-dynamodb'
import {
  getExpressionAttributeNamesTransformer,
  getUpdateExpressionTransformer,
} from '../util/transformer/dynamoData.transformer'
import { replaceSpecCharWithDash } from '../util/transformer/string.transformer'
import { TALENT_DEFAULT_UNAME } from '../config/conts.config'

export class TalentService {
  talent: TalentModel
  dynamoDbClient: DynamoDBClient = getDynamoDBClient()
  tableName: string = getEnvironmentVariableValue(ENVIRONMENT_VARIABLES.DYNAMODB_TABLE_NAME)

  constructor(talent: TalentModel) {
    this.talent = talent
  }

  groupTalentData(talents) {
    const { longitude, latitude, fullName, rating, category, city, province } = talents

    return JSON.stringify({
      fullName,
      city,
      province,
      talenId: this.talent.sk,
      rating,
      longitude,
      latitude,
      category,
    })
  }

  generateRedisRecord = async (): Promise<void> => {
    const { longitude, latitude, category } = this.talent.getTalent()
    const labelCategory = replaceSpecCharWithDash(category).toUpperCase()
    const redisUserData = this.groupTalentData(this.talent.getTalent())

    await Promise.all([
      getRedisClient().geoadd(`${TALENT_DEFAULT_UNAME}`, latitude, longitude, redisUserData),
      getRedisClient().geoadd(
        `${TALENT_DEFAULT_UNAME}-${labelCategory}`,
        latitude,
        longitude,
        redisUserData
      ),
    ])
  }

  deleteRedisRecord = async (): Promise<void> => {
    const originalData = (await this.getTalent()).talent
    const redisUserData = this.groupTalentData(originalData)
    const labelCategory = replaceSpecCharWithDash(originalData.category).toUpperCase()
    console.log(redisUserData)

    await Promise.all([
      getRedisClient().zrem(`${TALENT_DEFAULT_UNAME}`, redisUserData),
      getRedisClient().zrem(`${TALENT_DEFAULT_UNAME}-${labelCategory}`, redisUserData),
    ])
  }

  createTalent = async (): Promise<TalentModel> => {
    try {
      const putItemData = {
        TableName: this.tableName,
        Item: this.talent.toItemCreate(),
        ConditionExpression: 'attribute_not_exists(PK)',
      }
      await this.generateRedisRecord()
      await this.dynamoDbClient.send(new PutItemCommand(putItemData))
      return this.talent
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getTalent(): Promise<TalentModel> {
    const talent = new TalentModel({ contactNumber: this.talent.getTalent().contactNumber })
    try {
      const getItemData = {
        TableName: this.tableName,
        Key: talent.keys(),
      }

      const resp = await this.dynamoDbClient.send(new GetItemCommand(getItemData))
      return TalentModel.fromItem(resp.Item)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  updateTalent = async (): Promise<TalentModel> => {
    await this.deleteRedisRecord()

    try {
      const updateItemData = {
        TableName: this.tableName,
        Key: this.talent.keys(),
        ConditionExpression: 'attribute_exists(PK)',
        UpdateExpression: getUpdateExpressionTransformer(this.talent.getTalent()),
        ExpressionAttributeValues: getExpressionAttributeNamesTransformer(this.talent.toItem()),
      }

      await this.generateRedisRecord()
      await this.dynamoDbClient.send(new UpdateItemCommand(updateItemData))
      return this.talent
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  deleteTalent = async (): Promise<TalentModel> => {
    const { contactNumber } = this.talent.getTalent()
    const talent = new TalentModel({ contactNumber })
    const activeStatus = { active: 0 }

    try {
      const updateItemData = {
        TableName: this.tableName,
        Key: talent.keys(),
        ConditionExpression: 'attribute_exists(PK)',
        UpdateExpression: getUpdateExpressionTransformer(activeStatus),
        ExpressionAttributeValues: getExpressionAttributeNamesTransformer({
          active: { N: activeStatus.active.toString() },
        }),
      }

      await this.dynamoDbClient.send(new UpdateItemCommand(updateItemData))
      return this.talent
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

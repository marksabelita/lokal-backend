/* eslint-disable no-console */
import { getDynamoDBClient } from '../database/dynamoDb'
import { UserModel } from '../models/user.models'
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

export class UserService {
  user: UserModel
  dynamoDbClient: DynamoDBClient = getDynamoDBClient()
  tableName: string = getEnvironmentVariableValue(ENVIRONMENT_VARIABLES.DYNAMODB_TABLE_NAME)

  constructor(user: UserModel) {
    this.user = user
  }

  createUser = async (): Promise<UserModel> => {
    try {
      const putItemData = {
        TableName: this.tableName,
        Item: this.user.toItemCreate(),
        ConditionExpression: 'attribute_not_exists(PK)',
      }

      await this.dynamoDbClient.send(new PutItemCommand(putItemData))
      return this.user
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getUser(): Promise<UserModel> {
    const user = new UserModel({ contactNumber: this.user.getUser().contactNumber })

    try {
      const getItemData = {
        TableName: this.tableName,
        Key: user.keys(),
      }

      const resp = await this.dynamoDbClient.send(new GetItemCommand(getItemData))
      return UserModel.fromItem(resp.Item)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  updateUser = async (): Promise<UserModel> => {
    try {
      const updateItemData = {
        TableName: this.tableName,
        Key: this.user.keys(),
        ConditionExpression: 'attribute_exists(PK)',
        UpdateExpression: getUpdateExpressionTransformer(this.user.getUser(), ['contactNumber']),
        ExpressionAttributeValues: getExpressionAttributeNamesTransformer(this.user.toItem()),
      }

      await this.dynamoDbClient.send(new UpdateItemCommand(updateItemData))
      return this.user
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  deleteUser = async (): Promise<UserModel> => {
    const { contactNumber } = this.user.getUser()
    const user = new UserModel({ contactNumber })
    const activeStatus = { active: 0 }

    try {
      const updateItemData = {
        TableName: this.tableName,
        Key: user.keys(),
        ConditionExpression: 'attribute_exists(PK)',
        UpdateExpression: getUpdateExpressionTransformer(activeStatus),
        ExpressionAttributeValues: getExpressionAttributeNamesTransformer({
          active: { N: activeStatus.active.toString() },
        }),
      }

      await this.dynamoDbClient.send(new UpdateItemCommand(updateItemData))
      return this.user
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

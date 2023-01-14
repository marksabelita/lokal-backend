/* eslint-disable no-console */
import { getDynamoDBClient } from '../database/dynamoDb'
import { OTPModel } from '../models/otp.models'
import { ENVIRONMENT_VARIABLES, getEnvironmentVariableValue } from '../util/environments'
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb'

export class OtpService {
  otp: OTPModel
  dynamoDbClient: DynamoDBClient = getDynamoDBClient()
  tableName: string = getEnvironmentVariableValue(ENVIRONMENT_VARIABLES.DYNAMODB_TABLE_NAME)

  constructor(otp: OTPModel) {
    this.otp = otp
  }

  createOTP = async (): Promise<OTPModel> => {
    try {
      const putItemData = {
        TableName: this.tableName,
        Item: this.otp.toItemCreate(),
        ConditionExpression: 'attribute_not_exists(PK)',
      }

      await this.dynamoDbClient.send(new PutItemCommand(putItemData))
      return this.otp
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

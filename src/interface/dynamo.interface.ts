import { AttributeValue } from '@aws-sdk/client-dynamodb'

export interface IDynamoDBKey {
  [key: string]: AttributeValue
}

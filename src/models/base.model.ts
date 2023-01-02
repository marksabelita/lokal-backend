import { IDynamoDBKey } from '../interface/dynamo.interface'

export abstract class Item {
  abstract get pk(): string
  abstract get sk(): string

  public keys(): IDynamoDBKey {
    return {
      PK: { S: this.pk },
      SK: { S: this.sk },
    }
  }

  abstract toItem(): Record<string, unknown>
}

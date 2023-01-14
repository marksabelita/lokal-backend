import { DEFAULT_TTL } from '../config/conts.config'
import { IDynamoDBKey } from '../interface/dynamo.interface'
import { IOTPInterfaceModel } from '../interface/models/otp.interface'
import { Item } from './base.model'
import { AttributeValue } from '@aws-sdk/client-dynamodb'

export class OTPModel extends Item {
  otp: IOTPInterfaceModel

  constructor(otp: IOTPInterfaceModel) {
    super()
    this.otp = otp
  }

  static fromItem(item: IDynamoDBKey): OTPModel {
    if (!item) throw new Error('No item!')
    const formattedItem: IOTPInterfaceModel = {
      contactNumber: item.contactNumber.S,
      ttl: DEFAULT_TTL,
    }

    return new OTPModel(formattedItem)
  }

  get pk(): string {
    return `${this.otp.contactNumber}`
  }

  get sk(): string {
    return `#${this.otp.otp}`
  }

  getOtp(): IOTPInterfaceModel {
    return this.otp
  }

  toItem() {
    return {
      ...(this.otp.otp ? { firstName: { N: this.otp.otp.toString() } } : {}),
      ...(this.otp.ttl ? { longitude: { N: this.otp.ttl.toString() } } : {}),
    }
  }

  toItemCreate(): Record<string, AttributeValue> {
    return {
      ...this.keys(),
      ...(this.otp.contactNumber ? { contactNumber: { S: this.otp.contactNumber } } : {}),
      ...this.toItem(),
    }
  }
}

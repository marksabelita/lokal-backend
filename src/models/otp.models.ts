import { DEFAULT_TTL, NOT_EXIST_ERROR_MESSAGE, OTP_DEFAULT_UNAME } from '../config/conts.config'
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
    if (!item) throw new Error(NOT_EXIST_ERROR_MESSAGE)
    const formattedItem: IOTPInterfaceModel = {
      contactNumber: item.contactNumber.S,
      ttl: DEFAULT_TTL,
    }

    return new OTPModel(formattedItem)
  }

  get pk(): string {
    return `${OTP_DEFAULT_UNAME}#${this.otp.contactNumber}`
  }

  get sk(): string {
    return `${this.otp.otp}`
  }

  getOTP(): IOTPInterfaceModel {
    return this.otp
  }

  toItem() {
    return {
      ...(this.otp.otp ? { otp: { N: this.otp.otp.toString() } } : {}),
      ...(this.otp.purpose ? { purpose: { S: this.otp.purpose.toString() } } : {}),
      ...(this.otp.ttl
        ? { ttl: { N: this.otp.ttl.toString() } }
        : { ttl: { N: DEFAULT_TTL.toString() } }),
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

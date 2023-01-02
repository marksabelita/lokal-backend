import { IDynamoDBKey } from '../interface/dynamo.interface'
import { IUserInterfaceModel } from '../interface/models/user.interface'
import { Item } from './base.model'
import { AttributeValue } from '@aws-sdk/client-dynamodb'

export class UserModel extends Item {
  user: IUserInterfaceModel

  constructor(user: IUserInterfaceModel) {
    super()
    this.user = user
  }

  static fromItem(item: IDynamoDBKey): UserModel {
    if (!item) throw new Error('No item!')
    const formattedItem: IUserInterfaceModel = {
      contactNumber: item.contactNumber.S,
      firstName: item.firstName.S,
      lastName: item.lastName.S,
      userType: item?.userType.S,
      birthday: item.birthday.S,
      city: item.city.S,
      province: item.province.S,
      latitude: item.latitude && item.latitude.N ? parseFloat(item.latitude.N) : null,
      longitude: item.longitude && item.longitude.N ? parseFloat(item.longitude.N) : null,
      active: item.active && item.active.N ? parseInt(item.active.N) : null,
    }

    return new UserModel(formattedItem)
  }

  get pk(): string {
    return `USER#${this.user.contactNumber}`
  }

  get sk(): string {
    return `USER#${this.user.contactNumber}`
  }

  getUser(): IUserInterfaceModel {
    return this.user
  }

  toItem() {
    return {
      ...(this.user.firstName ? { firstName: { S: this.user.firstName } } : {}),
      ...(this.user.lastName ? { lastName: { S: this.user.lastName } } : {}),
      ...(this.user.userType ? { userType: { S: this.user.userType } } : {}),
      ...(this.user.birthday ? { birthday: { S: this.user.birthday } } : {}),
      ...(this.user.city ? { city: { S: this.user.city } } : {}),
      ...(this.user.province ? { province: { S: this.user.province } } : {}),
      ...(this.user.latitude ? { latitude: { N: this.user.latitude.toString() } } : {}),
      ...(this.user.longitude ? { longitude: { N: this.user.longitude.toString() } } : {}),
      ...(this.user.active ? { active: { N: this.user.active.toString() } } : {}),
    }
  }

  toItemCreate(): Record<string, AttributeValue> {
    return {
      ...this.keys(),
      ...(this.user.contactNumber ? { contactNumber: { S: this.user.contactNumber } } : {}),
      ...this.toItem(),
    }
  }
}

import { NOT_EXIST_ERROR_MESSAGE, TALENT_DEFAULT_UNAME } from '../config/conts.config'
import { IDynamoDBKey } from '../interface/dynamo.interface'
import { ITalentInterfaceModel } from '../interface/models/talent.interface'
import { Item } from './base.model'
import { AttributeValue } from '@aws-sdk/client-dynamodb'

export class TalentModel extends Item {
  talent: ITalentInterfaceModel

  constructor(talent: ITalentInterfaceModel) {
    super()
    this.talent = talent
  }

  static fromItem(item: IDynamoDBKey): TalentModel {
    if (!item) throw new Error(NOT_EXIST_ERROR_MESSAGE)

    const formattedItem: ITalentInterfaceModel = {
      contactNumber: item.contactNumber.S,
      fullName: item.fullName.S,
      category: item.category.S,
      categoryDetails: item.categoryDetails.S,
      city: item?.city.S,
      province: item?.province.S,
      experienceDetails: item?.experienceDetails.S,
      rating: item?.rating && item.rating.N ? parseFloat(item.rating.N) : null,
      latitude: item.latitude && item.latitude.N ? parseFloat(item.latitude.N) : null,
      longitude: item.longitude && item.longitude.N ? parseFloat(item.longitude.N) : null,
    }

    return new TalentModel(formattedItem)
  }

  get gsi1pk(): string {
    return this.pk
  }

  get gsi1sk(): string {
    return `${this.talent.category}`
  }

  get pk(): string {
    return `${TALENT_DEFAULT_UNAME}`
  }

  get sk(): string {
    return `${TALENT_DEFAULT_UNAME}#${this.talent.contactNumber}#${this.talent.category}`
  }

  getTalent(): ITalentInterfaceModel {
    return this.talent
  }

  toItem() {
    return {
      ...(this.talent.contactNumber ? { contactNumber: { S: this.talent.contactNumber } } : {}),
      ...(this.talent.fullName ? { fullName: { S: this.talent.fullName } } : {}),
      ...(this.talent.category ? { category: { S: this.talent.category } } : {}),
      ...(this.talent.categoryDetails
        ? { categoryDetails: { S: this.talent.categoryDetails } }
        : {}),
      ...(this.talent.city ? { city: { S: this.talent.city } } : {}),
      ...(this.talent.province ? { province: { S: this.talent.province } } : {}),
      ...(this.talent.experienceDetails
        ? { experienceDetails: { S: this.talent.experienceDetails } }
        : {}),
      ...(this.talent.rating ? { rating: { N: this.talent.rating.toString() } } : {}),
      ...(this.talent.latitude ? { latitude: { N: this.talent.latitude.toString() } } : {}),
      ...(this.talent.longitude ? { longitude: { N: this.talent.longitude.toString() } } : {}),
      ...(this.talent.joinDate ? { joinDate: { S: this.talent.joinDate } } : {}),
    }
  }

  toItemCreate(): Record<string, AttributeValue> {
    return {
      ...this.keys(),
      GSI1PK: { S: this.gsi1pk },
      GSI1SK: { S: this.gsi1sk },
      ...(this.talent.contactNumber ? { contactNumber: { S: this.talent.contactNumber } } : {}),
      ...this.toItem(),
    }
  }
}

import { ITalentInterfaceModel } from '../interface/models/talent.interface'
import { replaceCharWithDashUpperCase } from './transformer/string.transformer'

export const generateTalentUniqueKey = (talent: ITalentInterfaceModel) => {
  const { category, categoryDetails, contactNumber, rating } = talent

  const ratingData = rating ? rating : 0
  const categoryData = replaceCharWithDashUpperCase(category)
  const sCategoryData = replaceCharWithDashUpperCase(categoryDetails)

  return `TALENT#${contactNumber}#${categoryData}#${sCategoryData}#${ratingData}`
}

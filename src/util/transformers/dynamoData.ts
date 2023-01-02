export const getUpdateExpressionTransformer = (data, ommitList = []) => {
  const entriesData = Object.entries(data)
    .filter(([key]) => !ommitList.includes(key))
    .map(([key, _value]) => `${key} = :${key}`)

  return `SET ${entriesData.join(', ')}`
}

export const getExpressionAttributeNamesTransformer = (data) => {
  const entriesData = {}
  Object.entries(data).forEach(([key, _value]) => {
    entriesData[`:${key}`] = _value
  })
  return entriesData
}

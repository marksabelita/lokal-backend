export const replaceSpecCharWithDash = (str: string) => {
  return str.replace(/\W+(?!$)/g, '-').replace(/\W$/, '')
}

export const replaceCharWithDashUpperCase = (str: string) => {
  return str
    .replace(/\W+(?!$)/g, '-')
    .replace(/\W$/, '')
    .toUpperCase()
}

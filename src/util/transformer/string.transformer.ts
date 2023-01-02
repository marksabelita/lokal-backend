export const replaceSpecCharWithDash = (str: string) => {
  return str.replace(/\W+(?!$)/g, '-').replace(/\W$/, '')
}

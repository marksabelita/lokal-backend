export interface IGlobalTokenPayload {
  userId: string
  email: string
  cognitoToken: string
  sessionId: string
  iat: number
  authToken: string
}

import { ISecretValues } from '../interface/secrets.interface'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/user.models'

export const generateJWTToken = (secrets: ISecretValues, user: UserModel): Promise<string> => {
  const { PRIVATE_KEY } = secrets
  return jwt.sign(user.user, PRIVATE_KEY, { algorithm: 'RS256' })
}

export const checkJWTToken = (secrets: ISecretValues, token: string): Promise<UserModel> => {
  const { PUBLIC_KEY } = secrets
  return jwt.verify(token, PUBLIC_KEY)
}

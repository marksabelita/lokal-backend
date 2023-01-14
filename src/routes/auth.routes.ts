import type { AWS } from '@serverless/typescript'
// import { authorizer } from "../resources/authorizer";
import { cors } from '../resources/cors'

export const authRoutes: AWS['functions'] = {
  registerUser: {
    handler: 'src/handlers/Auth/register/index.handler',
    events: [
      {
        http: {
          cors: cors,
          method: 'post',
          path: '/auth/register',
        },
      },
    ],
  },
  validateOTP: {
    handler: 'src/handlers/Auth/validateOTP/index.handler',
    events: [
      {
        http: {
          cors: cors,
          method: 'post',
          path: '/auth/validate/otp',
        },
      },
    ],
  },
}

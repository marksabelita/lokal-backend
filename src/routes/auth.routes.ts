import type { AWS } from '@serverless/typescript'
// import { authorizer } from "../resources/authorizer";
import { cors } from '../resources/cors'

export const authRoutes: AWS['functions'] = {
  postAuthRegister: {
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
  postAuthLogin: {
    handler: 'src/handlers/Auth/login/index.handler',
    events: [
      {
        http: {
          cors: cors,
          method: 'post',
          path: '/auth/login',
        },
      },
    ],
  },
  postAuthAuthenticate: {
    handler: 'src/handlers/Auth/authenticate/index.handler',
    events: [
      {
        http: {
          cors: cors,
          method: 'post',
          path: '/auth/authenticate',
        },
      },
    ],
  },
  postCheckAuth: {
    handler: 'src/handlers/Auth/checkAuth/index.handler',
    events: [
      {
        http: {
          cors: cors,
          method: 'post',
          path: '/auth/check',
        },
      },
    ],
  },
}

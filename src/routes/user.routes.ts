import type { AWS } from '@serverless/typescript'
// import { authorizer } from "../resources/authorizer";
import { cors } from '../resources/cors'

export const userRoutes: AWS['functions'] = {
  createUser: {
    handler: 'src/handlers/User/create/index.handler',
    events: [
      {
        http: {
          cors: cors,
          method: 'post',
          path: '/user',
        },
      },
    ],
  },
  getUser: {
    handler: 'src/handlers/User/get/index.handler',
    events: [
      {
        http: {
          cors: cors,
          method: 'get',
          path: '/user/{contactNumber}',
        },
      },
    ],
  },
  updateUser: {
    handler: 'src/handlers/User/patch/index.handler',
    events: [
      {
        http: {
          cors: cors,
          method: 'patch',
          path: '/user/{contactNumber}',
        },
      },
    ],
  },
  deleteUser: {
    handler: 'src/handlers/User/delete/index.handler',
    events: [
      {
        http: {
          cors: cors,
          method: 'delete',
          path: '/user/{contactNumber}',
        },
      },
    ],
  },
}

import type { AWS } from '@serverless/typescript'
// import { authorizer } from "../resources/authorizer";
import { cors } from '../resources/cors'

export const talentRoutes: AWS['functions'] = {
  getTalentCategories: {
    handler: 'src/handlers/Talent/getCategories/index.handler',
    events: [
      {
        http: {
          cors: cors,
          method: 'get',
          path: '/talent/categories',
        },
      },
    ],
  },
  getTalentByLocation: {
    handler: 'src/handlers/Talent/getByLocation/index.handler',
    events: [
      {
        http: {
          cors: cors,
          method: 'get',
          path: '/talent/location',
        },
      },
    ],
  },
  createTalent: {
    handler: 'src/handlers/Talent/create/index.handler',
    events: [
      {
        http: {
          cors: cors,
          method: 'post',
          path: '/talent',
        },
      },
    ],
  },
  getTalent: {
    handler: 'src/handlers/Talent/get/index.handler',
    events: [
      {
        http: {
          cors: cors,
          method: 'get',
          path: '/talent/{contactNumber}',
        },
      },
    ],
  },
  updateTalent: {
    handler: 'src/handlers/Talent/patch/index.handler',
    events: [
      {
        http: {
          cors: cors,
          method: 'patch',
          path: '/talent/{contactNumber}',
        },
      },
    ],
  },
  deleteTalent: {
    handler: 'src/handlers/Talent/delete/index.handler',
    events: [
      {
        http: {
          cors: cors,
          method: 'delete',
          path: '/talent/{contactNumber}',
        },
      },
    ],
  },
}

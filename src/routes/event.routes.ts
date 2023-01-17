import type { AWS } from '@serverless/typescript'
// import { authorizer } from "../resources/authorizer";
import { cors } from '../resources/cors'

export const eventRoutes: AWS['functions'] = {
  getEventCategories: {
    handler: 'src/handlers/Event/getCategories/index.handler',
    events: [
      {
        http: {
          cors: cors,
          method: 'get',
          path: '/event/categories',
        },
      },
    ],
  },
  getEventTypes: {
    handler: 'src/handlers/Event/getTypes/index.handler',
    events: [
      {
        http: {
          cors: cors,
          method: 'get',
          path: '/event/types',
        },
      },
    ],
  },
}

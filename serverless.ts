import type { AWS } from '@serverless/typescript'
import { dynamoDbResource } from './src/resources/stacks/dynamo'
// import { authResource } from './src/resources/stacks/authorizers'

// api gateway
import { userRoutes } from './src/routes/user.routes'
import { talentRoutes } from './src/routes/talent.routes'
import { authRoutes } from './src/routes/auth.routes'
import { eventRoutes } from './src/routes/event.routes'

// events
import { registerEvents } from './src/events/register'

const environment = {
  ENV: '${env:ENV}',
  REGION: '${env:REGION}',
  DYNAMODB_LOCAL_ENDPOINT: '${env:DYNAMODB_LOCAL_ENDPOINT}',
  DYNAMODB_TABLE_NAME: '${env:DYNAMODB_TABLE_NAME}',
  SECRET_ID: '${env:SECRET_ID}',
  LOCAL_SECRET_PATH: '${env:LOCAL_SECRET_PATH}',
  EVENT_BRIDGE_LOCAL_ENDPOINT: '${env:EVENT_BRIDGE_LOCAL_ENDPOINT}',
}

// const domainName = `${environment.ENV == 'production' ? '' : `${environment.ENV}-`}boilerplate-api.${environment.API_DOMAIN_NAME}`

const serverless: AWS = {
  service: 'lokal-boilerplate',
  frameworkVersion: '3',
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'us-east-2',
    versionFunctions: false,
    environment: environment,
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['lambda:InvokeFunction'],
        Resource: '*',
      },
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:DescribeTable',
          'dynamodb:Query',
          'dynamodb:Scan',
          'dynamodb:GetItem',
          'dynamodb:PutItem',
          'dynamodb:DeleteItem',
        ],
        Resource: 'arn:aws:dynamodb:${env:REGION}:*:table/${env:DYNAMODB_TABLE_NAME}',
      },
    ],
    layers: [{ Ref: 'CommonLibsLambdaLayer' }],
  },
  package: {
    individually: true,
    excludeDevDependencies: true,
  },
  plugins: [
    'serverless-webpack',
    'serverless-webpack-layers',
    'serverless-dynamodb-local',
    'serverless-plugin-warmup',
    'serverless-offline',
    'serverless-offline-aws-eventbridge',
    // 'serverless-domain-manager',
  ],
  layers: {
    commonLibs: {
      path: 'layers/commonLib',
      name: 'layer-common-lib-node-modules-boilerplate',
      description: 'Project boilerplate',
      retain: true,
    },
  },
  custom: {
    webpack: {
      includeModules: false,
      webpackConfig: 'webpack.config.js',
      packager: 'npm',
    },
    layerConfig: {
      webpack: {
        clean: true,
        configPath: 'webpack-layer.config.js',
      },
      exportLayers: true,
      installLayers: true,
      upgradeLayerReferences: true,
    },
    warmup: {
      default: {
        enabled: true,
        role: 'IamRoleLambdaExecution',
        logRetentionInDays: 14,
      },
    },
    dynamodb: {
      start: {
        port: 8001,
        inMemory: true,
        migrate: true,
      },
      stages: ['dev'],
    },
    'serverless-offline-aws-eventbridge': {
      port: 4010,
      mockEventBridgeServer: true,
      hostname: '127.0.0.1',
      pubSubPort: 4011,
      debug: false,
      account: '',
      maximumRetryAttempts: 10,
      retryDelayMs: 500,
      payloadSizeLimit: '10mb',
    },
    documentation: {
      version: '1',
      title: 'My API',
      description: 'This is my API',
      models: {},
    },
    // customDomain: {
    //   domainName,
    //   basePath: '',
    //   stage: '${sls:stage}',
    //   createRoute53Record: true,
    //   certificateName: 'certificate.name',
    // },
  },
  useDotenv: true,
  functions: {
    //api-gateway
    ...userRoutes,
    ...talentRoutes,
    ...authRoutes,
    ...eventRoutes,

    //events
    ...registerEvents,
  },
  resources: {
    Resources: {
      // ...authResource
      ...dynamoDbResource,
    },
  },
}

module.exports = serverless

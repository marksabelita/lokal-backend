import type { AWS } from '@serverless/typescript'
import { dynamoDbResource } from './src/resources/stacks/dynamo'
// import { authResource } from './src/resources/stacks/authorizers'

// routes
import { userRoutes } from './src/routes/user.routes'

const environment = {
  ENV: '${env:ENV}',
  REGION: '${env:REGION}',
  DYNAMODB_LOCAL_ENDPOINT: '${env:DYNAMODB_LOCAL_ENDPOINT}',
  DYNAMODB_TABLE_NAME: '${env:DYNAMODB_TABLE_NAME}',
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
    ...userRoutes,
  },
  resources: {
    Resources: {
      // ...authResource
      ...dynamoDbResource,
    },
  },
}

module.exports = serverless

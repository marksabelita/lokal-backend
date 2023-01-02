import { AWS } from '@serverless/typescript'

export const authResource: AWS['resources']['Resources'] = {
  GPAuthorizer: {
    Type: 'AWS::ApiGateway::Authorizer',
    Properties: {
      Name: 'GPAuthorizer-${self:service}-${sls:stage}',
      Type: 'TOKEN',
      IdentitySource: 'method.request.header.Authorization',
      AuthorizerUri: {
        'Fn::Join': [
          '',
          [
            'arn:aws:apigateway:',
            { Ref: 'AWS::Region' },
            ':lambda:path/2015-03-31/functions/',
            'arn:aws:lambda:us-east-2:157571393255:function:${sls:stage}-authorizer-gp',
            '/invocations',
          ],
        ],
      },
      RestApiId: '${env:REST_API_ID}',
    },
  },
}

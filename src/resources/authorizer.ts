import { AwsArn, AwsCfInstruction } from '@serverless/typescript'

interface Authorizer {
  arn?: AwsArn
  authorizerId?: AwsCfInstruction
  claims?: string[]
  identitySource?: string
  identityValidationExpression?: string
  managedExternally?: boolean
  name?: string
  resultTtlInSeconds?: number
  scopes?: string[]
  type?: string
}

export const authorizer: Authorizer = {
  type: 'CUSTOM',
  authorizerId: { Ref: 'GPAuthorizer' },
}

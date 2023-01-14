export enum ENVIRONMENT_VARIABLES {
  ENV = 'ENV',
  DYNAMODB_LOCAL_ENDPOINT = 'DYNAMODB_LOCAL_ENDPOINT',
  REGION = 'REGION',
  DYNAMODB_TABLE_NAME = 'DYNAMODB_TABLE_NAME',
  IS_OFFLINE = 'IS_OFFLINE',
  REDIS_HOST = 'REDIS_HOST',
  REDIS_PASSWORD = 'REDIS_PASSWORD',
  REDIS_PORT = 'REDIS_PORT',
  EVENT_BRIDGE_LOCAL_ENDPOINT = 'EVENT_BRIDGE_LOCAL_ENDPOINT',
  TWILIO_SID = 'TWILIO_SID',
  TWILIO_TOKEN = 'TWILIO_TOKEN',
  TWILIO_CONTACT = 'TWILIO_CONTACT',
}

export enum ENVIRONMENTS {
  DEV = 'dev',
  STG = 'stg',
  PROD = 'prod',
}

export const getEnvironmentVariableValue = (
  envVar: ENVIRONMENT_VARIABLES,
  defaultValue?: string
): string | undefined => {
  return process.env[envVar] ?? defaultValue
}

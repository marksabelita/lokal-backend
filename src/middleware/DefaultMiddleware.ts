// import { GetEnviromentSecretMiddleware } from './GetEnviromentSecretMiddleware'
import warmup from '@middy/warmup'
import { SetEnvMiddleware } from './SetEnvMiddleware'
import httpErrorHandler from '@middy/http-error-handler'
// import { AuthMiddleware } from './AuthMiddleware'
import { LoggerMiddleware } from './LoggerMiddleware'

const isWarmingUp = (event) => event.isWarmingUp === true

export const defaultMiddleware = [
  warmup({ isWarmingUp }),
  LoggerMiddleware(),
  SetEnvMiddleware(),
  // GetEnviromentSecretMiddleware(),
  // AuthMiddleware(),
  httpErrorHandler(),
]

export const defaultMiddlewareWithDb = [...defaultMiddleware]

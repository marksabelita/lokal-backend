import Redis from 'ioredis'
import { ENVIRONMENT_VARIABLES, getEnvironmentVariableValue } from '../util/environments'
let client = null

export const getRedisClient = (): Redis => {
  if (client) return client
  const host = getEnvironmentVariableValue(ENVIRONMENT_VARIABLES.REDIS_HOST)
  const port = getEnvironmentVariableValue(ENVIRONMENT_VARIABLES.REDIS_PORT)
  const password = getEnvironmentVariableValue(ENVIRONMENT_VARIABLES.REDIS_PASSWORD)

  client = new Redis({
    port: parseInt(port), // Redis port
    host, // Redis host
    password,
  })

  return client
}

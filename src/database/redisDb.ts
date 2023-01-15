import Redis from 'ioredis'
import { ISecretValues } from '../interface/secrets.interface'
let client = null

export const getRedisClient = (secrets: ISecretValues): Redis => {
  if (client) return client
  const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = secrets

  client = new Redis({
    port: parseInt(REDIS_PORT), // Redis port
    host: REDIS_HOST, // Redis host
    password: REDIS_PASSWORD,
  })

  return client
}

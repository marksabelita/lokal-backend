import { ENVIRONMENT_VARIABLES, getEnvironmentVariableValue } from './environments.util'

export const checkIsOffline = (): boolean => {
  const offlineVar = getEnvironmentVariableValue(ENVIRONMENT_VARIABLES.IS_OFFLINE)
  return offlineVar.toLowerCase() === 'true'
}

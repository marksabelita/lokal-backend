import { ENVIRONMENTS, ENVIRONMENT_VARIABLES, getEnvironmentVariableValue } from './environments'

export enum LogType {
  INFO = 'INFO',
  DEBUG = 'DEBUG',
  ERROR = 'ERROR',
}

export class Logger {
  private trackingCode: string
  constructor(trackingCode?: string) {
    this.trackingCode = trackingCode ?? Date.now().toString()
  }

  private out(type: LogType, message: string): void {
    /* eslint-disable no-console */
    console.log(`${this.trackingCode}@${type}--${new Date().toISOString()}: ${message}`)
  }

  public info(message: string): void {
    this.out(LogType.INFO, message)
  }

  public error(message: string): void {
    this.out(LogType.ERROR, message)
  }

  public debug(message: string): void {
    if (getEnvironmentVariableValue(ENVIRONMENT_VARIABLES.ENV) === ENVIRONMENTS.PROD) return
    this.out(LogType.DEBUG, message)
  }

  public getTrackingCode(): string {
    return this.trackingCode
  }
}

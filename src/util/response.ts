import { HTTP_CODE } from '../interface/enums/http'

export interface LambdaResponse {
  statusCode: number
  body: string
  headers: any
}

const buildResponse = (
  statusCode: HTTP_CODE,
  trackingCode: string,
  message: string,
  data?: any
): LambdaResponse => {
  return {
    statusCode,
    body: JSON.stringify({
      statusCode,
      message,
      trackingCode,
      data,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }
}

export const success = (trackingCode: string, message: string, data?: any) => {
  return buildResponse(HTTP_CODE.OK, trackingCode, message, data)
}

export const error = (
  statusCode: HTTP_CODE,
  trackingCode: string,
  message: string,
  data: any = {}
) => {
  return buildResponse(statusCode, trackingCode, message, data)
}

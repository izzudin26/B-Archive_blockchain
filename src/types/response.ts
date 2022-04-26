export interface Response {
  statusCode: number;
  message: String;
  data?: any;
}

export const HttpResponse = (code: Readonly<number>, message: Readonly<String>, data?: Readonly<any>): Response => ({
    statusCode: code,
    message: message,
    data
})

export const HttpError = (status: Readonly<number>, message: Readonly<String>): Response => ({
    statusCode: status,
    message: message
})
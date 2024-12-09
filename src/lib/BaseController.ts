import { Response } from 'express'
type IMeta = {
  page: number
  limit: number
  total: number
  totalPages: number
}
type IApiResponse<T> = {
  statusCode: number
  success: boolean
  message?: string | null
  data?: T | null
  meta?: IMeta
}

class BaseController {
  public model
  constructor(model: any = '') {
    this.model = model
  }

  sendResponse<T>(res: Response, data: IApiResponse<T>): void {
    const responseData: IApiResponse<T> = {
      statusCode: data.statusCode,
      success: data.success,
      message: data.message || null,
      meta: data.meta || null || undefined,
      data: data.data || null || undefined,
    }

    res.status(data.statusCode).json(responseData)
  }
}

export default BaseController
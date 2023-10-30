import QueryString from 'qs'
import { rejectIfNeeded } from './reject-if-needed'

interface RequestConfig {
  params?: any
  headers?: HeadersInit
  signal?: AbortSignal
}

type FetchArgs = {
  url: string
  query?: string
  body?: any
  method: string
  config: RequestConfig
  credentials?: RequestInit['credentials']
}

type RequestInterceptor = (requestArgs: FetchArgs) => Promise<FetchArgs>
type ResponseInterceptor = (response: Response, requestArgs: FetchArgs) => Promise<Response>

type Interceptors = {
  request?: RequestInterceptor
  response?: ResponseInterceptor
}

interface FetchConfig {
  /**
   * default is `http://localhost:8080`
   */
  baseURL?: string
  headers?: object
  cookie?: string
  credentials?: RequestInit['credentials']
  globalInterceptor?: Interceptors
}

interface ApiResponse<T> {
  data: T
  headers: Headers
  status: { statusCode: Response['status']; statusText: Response['statusText'] }
}

class FetchClient {
  private baseURL: string
  private headers: object
  private cookie: string
  private credentials: RequestInit['credentials']
  private globalInterceptor: Interceptors | undefined

  constructor({ baseURL, headers, cookie, credentials, globalInterceptor }: FetchConfig) {
    this.baseURL = baseURL ?? 'http://localhost:8080'
    this.headers = headers ?? {}
    this.cookie = cookie ?? ''
    this.credentials = credentials
    this.globalInterceptor = globalInterceptor
  }

  private async applyInterceptor(requestArgs: FetchArgs): Promise<{
    finalRequestArgs: FetchArgs
    responseInterceptor: ResponseInterceptor | undefined
  }> {
    let finalRequestArgs = requestArgs

    if (this.globalInterceptor?.request) {
      finalRequestArgs = await this.globalInterceptor.request(finalRequestArgs)
    }

    let responseInterceptor: ResponseInterceptor | undefined
    if (this.globalInterceptor?.response) {
      responseInterceptor = this.globalInterceptor.response
    }

    return { finalRequestArgs, responseInterceptor }
  }

  private async sendRequest({
    finalRequestArgs,
    responseInterceptor,
  }: {
    finalRequestArgs: FetchArgs
    responseInterceptor: ResponseInterceptor | undefined
  }): Promise<Response> {
    const response = await fetch(
      this.baseURL.concat(finalRequestArgs.url, finalRequestArgs.query ?? ''),
      {
        method: finalRequestArgs.method,
        ...(finalRequestArgs.credentials ? { credentials: finalRequestArgs.credentials } : {}),
        headers: {
          ...(this.headers ?? {}),
          ...(finalRequestArgs.config.headers ?? {}),
        },
        ...(finalRequestArgs.body ?? { body: JSON.stringify(finalRequestArgs.body) }),
      },
    )

    const finalResponse = responseInterceptor
      ? await responseInterceptor(response, finalRequestArgs)
      : response

    return finalResponse
  }

  async apiResponse<T>(data: T, response: Response): Promise<ApiResponse<T>> {
    const { headers, status, statusText } = response
    return {
      data,
      headers,
      status: { statusCode: status, statusText },
    }
  }

  async get<T>(url: string, config: RequestConfig = {}) {
    const query = config?.params
      ? QueryString.stringify(config?.params, { addQueryPrefix: true })
      : ''

    const requestArgs: FetchArgs = {
      method: 'GET',
      url,
      query,
      config,
      ...(typeof window === 'undefined' ? {} : { credentials: this.credentials }),
    }
    const { finalRequestArgs, responseInterceptor } = await this.applyInterceptor(requestArgs)
    const finalResponse = await this.sendRequest({ finalRequestArgs, responseInterceptor })

    await rejectIfNeeded(finalResponse)

    const data: T = await finalResponse.json()
    return this.apiResponse<T>(data, finalResponse)
  }

  async post<T>(url: string, body?: any, config: RequestConfig = {}) {
    const requestArgs: FetchArgs = {
      method: 'POST',
      url,
      body,
      config: { ...config, ...(body ? { 'Content-Type': 'application/json' } : {}) },
      ...(typeof window === 'undefined' ? {} : { credentials: this.credentials }),
    }
    const { finalRequestArgs, responseInterceptor } = await this.applyInterceptor(requestArgs)
    const finalResponse = await this.sendRequest({ finalRequestArgs, responseInterceptor })

    await rejectIfNeeded(finalResponse)

    const data: T = await finalResponse.json()
    return this.apiResponse<T>(data, finalResponse)
  }

  async patch<T>(url: string, body: any, config: RequestConfig = {}) {
    const requestArgs: FetchArgs = {
      method: 'PATCH',
      url,
      body,
      config: { ...config, ...(body ? { 'Content-Type': 'application/json' } : {}) },
      ...(typeof window === 'undefined' ? {} : { credentials: this.credentials }),
    }
    const { finalRequestArgs, responseInterceptor } = await this.applyInterceptor(requestArgs)
    const finalResponse = await this.sendRequest({ finalRequestArgs, responseInterceptor })

    await rejectIfNeeded(finalResponse)

    const data: T = await finalResponse.json()
    return this.apiResponse<T>(data, finalResponse)
  }

  async delete<T = any>(url: string, config: RequestConfig = {}) {
    const query = config?.params
      ? QueryString.stringify(config?.params, { addQueryPrefix: true })
      : ''

    const requestArgs: FetchArgs = {
      method: 'PATCH',
      url,
      query,
      config,
      ...(typeof window === 'undefined' ? {} : { credentials: this.credentials }),
    }
    const { finalRequestArgs, responseInterceptor } = await this.applyInterceptor(requestArgs)
    const finalResponse = await this.sendRequest({ finalRequestArgs, responseInterceptor })

    await rejectIfNeeded(finalResponse)

    const data: T = finalResponse.headers.get('Content-Type')?.includes('json')
      ? await finalResponse.json()
      : ((await finalResponse.text()) as any)

    return this.apiResponse<T>(data, finalResponse)
  }
}

export const fetchClient = {
  create: (config: FetchConfig) => new FetchClient(config),
}

import Api from '@api/api'

interface FetchOptions {
  method?: 'POST' | 'GET',
  headers?: {
    Accept?: 'application/json',
    'Content-Type'?: 'application/json'
    Authorization?: string
    'X-CSRF-Token'?: string
  },
  postBody?: any
}

export interface FetchResp {
  status: 'ok' | 'error',
  error?: string
  data?: {
    [k:string]: any
  }
}
const fetcher = async (url: string, options?: FetchOptions):Promise<FetchResp> => {
  const csrfToken = Api.getVar('APP_TOKEN')
  try {
    const fetchOptions = {
      method: options?.method || 'GET',
      headers: {
        'Accept': options?.headers?.Accept || 'application/json',
        'Content-Type': options?.headers?.['Content-Type'] || 'application/json',
        'Authorization': options?.headers?.Authorization || '',
        'X-CSRF-Token': options?.headers?.['X-CSRF-Token'] || csrfToken,
      },
      ...(options?.postBody ? { body: JSON.stringify(options.postBody) } : []),
    }


    return fetch(url, fetchOptions)
      .then(resp => resp.json())
      .then(data => {
        if (data.error) {
          return {
            status: 'error',
            error: data.error,
          }
        }
        return {
          status: 'ok',
          data,
        }
      })
  } catch (err) {
    console.error(err)
  }
}

export default fetcher

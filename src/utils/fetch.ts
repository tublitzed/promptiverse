import ApiService from '@services/api-service'

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

const fetcher = async (url: string, options?: FetchOptions) => {
  const csrfToken = ApiService.getVar('APP_TOKEN')
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
      .then(response => {
        if (!response.ok) {
          // throw new Error(response.statusText)
          console.error(response.statusText)
          return { error: response.statusText,
            status: response.status }
        }
        return response.json()
      })
      .then(resp => resp)
  } catch (err) {
    console.log(err)
  }
}

export default fetcher

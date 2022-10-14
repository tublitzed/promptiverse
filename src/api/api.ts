import fetcher from '../utils/fetch'
declare global {
  interface Window {
    promptiverse: any;
  }
}

window.promptiverse = window.promptiverse || {}

const ApiService = {
  getVar: (name: any) => {
    if (!window.promptiverse || !window.promptiverse.vars) {
      return undefined
    }
    return window.promptiverse.vars[name]
  },
  generateImage: (prompt: string, accessToken: string) => {
    const apiUrl = ApiService.getVar('API_SERVER_URL')
    return fetcher(`${apiUrl}/api/prompt`, {
      method: 'POST',
      postBody: { prompt },
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })
  },
  sandboxTest: (accessToken: string) => {
    const apiUrl = ApiService.getVar('API_SERVER_URL')
    return fetcher(`${apiUrl}/sandbox`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })
  },
}

export default ApiService

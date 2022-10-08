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
  getImage(prompt: string) {
    const apiUrl = ApiService.getVar('API_SERVER_URL')
    return fetcher(`${apiUrl}/prompt`, {
      method: 'POST',
      postBody: { prompt },
    })
  },
}

export default ApiService

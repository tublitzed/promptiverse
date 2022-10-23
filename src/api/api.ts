import fetcher from '@utils/fetch'
import { Tag, Tag_Category, PromptApiResponse } from '@types'
declare global {
  interface Window {
    promptiverse: any;
  }
}

window.promptiverse = window.promptiverse || {}

interface GenerateImageArgs {
  prompt: string
  promptRaw?: string
  accessToken: string
  seed?: number
  tagIds?: string[]
}

const ApiService = {
  getVar: (name: any) => {
    if (!window.promptiverse || !window.promptiverse.vars) {
      return undefined
    }
    return window.promptiverse.vars[name]
  },
  generateImage: ({
    accessToken,
    prompt,
    promptRaw,
    seed,
    tagIds = [],
  }:GenerateImageArgs):Promise<{ prompt: PromptApiResponse }> => {
    const apiUrl = ApiService.getVar('API_SERVER_URL')
    return fetcher(`${apiUrl}/api/prompt`, {
      method: 'POST',
      postBody: {
        prompt_raw: promptRaw || prompt,
        prompt,
        seed,
        tag_ids: tagIds,
      },
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })
  },
  getTags: (accessToken: string):Promise<{ tags: Tag[], categories: Tag_Category[]}> => {
    const apiUrl = ApiService.getVar('API_SERVER_URL')
    return fetcher(`${apiUrl}/api/tag`, {
      method: 'GET',
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

import fetcher from '@utils/fetch'
import { Tag, TagCategory, PromptApiResponse, Prompt, TagApiResponse } from '@types'

import { mapPromptListToTypes, mapTagListToTypes } from './mappings'

declare global {
  interface Window {
    promptiverse: any;
  }
}

window.promptiverse = window.promptiverse || {}

interface GenerateImageArgs {
  promptRaw: string
  accessToken: string
  seed?: number
  tagIds?: string[]
}

interface ApiRequest {
  accessToken: string
  method?: 'GET' | 'POST'
  path: string
  postBody?: any
}

const ApiService = {
  request: ({
    accessToken,
    method = 'GET',
    path,
    postBody,
  }:ApiRequest) => {
    const apiUrl = `${ApiService.getVar('API_SERVER_URL')}/api`
    return fetcher(`${apiUrl}${path}`, {
      method,
      postBody,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })
  },

  getVar: (name: any) => {
    if (!window.promptiverse || !window.promptiverse.vars) {
      return undefined
    }
    return window.promptiverse.vars[name]
  },

  generateImage: ({
    accessToken,
    promptRaw,
    seed,
    tagIds = [],
  }:GenerateImageArgs):Promise<{ prompt: PromptApiResponse }> => {
    return ApiService.request({
      accessToken,
      path: '/prompt',
      method: 'POST',
      postBody: {
        prompt_raw: promptRaw,
        seed,
        tag_ids: tagIds,
      },
    })
  },

  getImages: async (accessToken: string):Promise<{ prompts: PromptApiResponse[]}> => {
    return ApiService.request({
      accessToken,
      path: '/prompt',
    }).then(resp => ({ prompts: mapPromptListToTypes(resp.prompts) }))
  },

  getTags: async (accessToken: string):Promise<{ tags: Tag[], categories: TagCategory[]}> => {
    return ApiService.request({
      accessToken,
      path: '/tag',
    }).then(resp => ({
      tags: mapTagListToTypes(resp.tags),
      categories: resp.categories,
    }))
  },

  sandboxTest: (accessToken: string) => {
    return ApiService.request({
      accessToken,
      path: '/sandbox',
      method: 'POST',
    })
  },
}

export default ApiService

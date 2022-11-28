import fetcher, { FetchResp } from '@utils/fetch'
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
  accessToken?: string
  seed?: number
  tagIds?: string[]
}

interface ApiRequest {
  accessToken: string
  method?: 'GET' | 'POST'
  path: string
  postBody?: any
}

interface PublicApiRequest extends Partial<ApiRequest> {
  method?: ApiRequest['method'],
  path: string
  postBody?: any
}

interface GenerateImageResp extends FetchResp {
  prompt: PromptApiResponse
}

interface GetTagsResp {
  tags: Tag[],
  categories: TagCategory[]
  latestTagUpdatedAt: Date
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

  publicRequest: ({
    method = 'GET',
    path,
    postBody,
  }:PublicApiRequest) => {
    const apiUrl = `${ApiService.getVar('API_SERVER_URL')}/api`
    return fetcher(`${apiUrl}${path}`, {
      method,
      postBody,
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
  }:GenerateImageArgs):Promise<GenerateImageResp | FetchResp> => {
    if (accessToken) {
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
    }
    return ApiService.publicRequest({
      path: '/prompt/public',
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
    }).then(resp => ({ prompts: mapPromptListToTypes(resp.data.prompts) }))
  },

  getTags: async (accessToken?: string):Promise<GetTagsResp> => {
    if (accessToken) {
      return ApiService.request({
        accessToken,
        path: '/tag',
      }).then(resp => ({
        tags: mapTagListToTypes(resp.data.tags),
        categories: resp.data.categories,
        latestTagUpdatedAt: resp.data.latest_tag_updated_at,
      }))
    }

    return ApiService.publicRequest({
      path: '/tag/public',
    }).then(resp => ({
      tags: mapTagListToTypes(resp.data.tags),
      categories: resp.data.categories,
      latestTagUpdatedAt: resp.data.latest_tag_updated_at,
    }))
  },

  getCacheInfo: (accessToken: string) => {
    return ApiService.request({
      accessToken,
      path: '/tag/cache-check',
    })
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

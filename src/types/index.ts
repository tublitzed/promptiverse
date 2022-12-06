export interface User {
  email: string
  email_verified: boolean
  username: string
  name:string
  nickname: string
  picture: string
  sub: string
  updated_at: string
  access_token?: string
}

export interface PromptApiResponse {
  engine?: string
  id: string
  img_url?: string
  prompt: string
  prompt_raw?:string
  seed?: number
  tagIds?: string[]
}

export interface Prompt extends Omit<PromptApiResponse, 'img_url' | 'prompt_raw'> {
  engine?: string
  id: string
  imgUrl?: string
  prompt: string
  promptRaw?:string
  seed?: number
  tagIds?: string[]
  loading?: boolean
}

export interface TagCategory {
  id: number
  label: string
  is_public: boolean
}

export interface TagApiResponse {
  label: string
  id: string
  tag_category: number
}

export interface Tag extends Omit<TagApiResponse, 'tag_category'> {
  tagCategory: number
}

export interface TagCollection {
  category: TagCategory
  allTags: Tag[]
  selectedTags: Tag[]
}


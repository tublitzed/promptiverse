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
  imgUrl?: string
  prompt: string
  promptRaw?:string
  seed?: number
  tagIds?: string[]
  version?: number
}

export interface Prompt extends PromptApiResponse {
  loading: boolean
}

export interface Tag_Category {
  id: number
  label: string
}

export interface Tag {
  label: string
  id: string
  // # TODO: find a performant way to transform them out of snake case before hitting the client
  tag_category: number
}

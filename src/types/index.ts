export interface User {
  email: string
  email_verified: boolean
  username: string
  name:string
  nickname: string
  picture: string
  sub: string
  updated_at: string
}

export interface Prompt {
  value?: string
  url?: string
  id?: string
  loading: boolean
}

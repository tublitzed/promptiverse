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

export interface Prompt {
  value?: string
  imgUrl?: string
  id?: string
  engine?: string
  version?: number
  loading: boolean
}

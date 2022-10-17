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
  seed?: number
  value?: string
  imgUrl?: string
  id?: string
  engine?: string
  version?: number
  loading: boolean
}

export const tagCategoriesWithMeta = {
  ARTIST: {
    label: 'Artists',
  },
  DESCRIPTIVE: {
    label: 'Descriptive words',
  },
} as const

export type TagCategory = keyof typeof tagCategoriesWithMeta
export const tagCategories = Object.keys(tagCategoriesWithMeta) as TagCategory[]

export interface Tag {
  label: string
  value: string
}

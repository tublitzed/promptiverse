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

export const stylePresetLabels = {
  '3d-model': '3D Model',
  'analog-film': 'Analog Film',
  'anime': 'Anime',
  'cinematic': 'Cinematic',
  'comic-book': 'Comic Book',
  'digital-art': 'Digital Art',
  'enhance': 'Enhance',
  'fantasy-art': 'Fantasy Art',
  'isometric': 'Isometric',
  'line-art': 'Line Art',
  'low-poly': 'Low Poly',
  'modeling-compound': 'Modeling Compound',
  'neon-punk': 'Neon Punk',
  'origami': 'Origami',
  'photographic': 'Photographic',
  'pixel-art': 'Pixel Art',
  'tile-texture': 'Tile Texture',
} as const

export type StylePreset = keyof typeof stylePresetLabels
export const stylePresets = Object.keys(stylePresetLabels) as StylePreset[]

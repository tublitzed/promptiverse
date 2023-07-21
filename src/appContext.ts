import { createContext } from 'react'
import { User, Prompt, TagCollection } from '@types'
import LocalStorage from '@utils/localStorage'
import { StylePreset } from '@types'

export interface AppContextProps {
  isLoading: boolean
  prompt?: Prompt
  setIsLoading: (isLoading: boolean) => void
  setPrompt: (prompt?:Prompt) => void
  setStylePreset: (stylePreset?: StylePreset) => void
  setTags: (tags?: TagCollection[]) => void
  setUser: (user?: any) => void
  stylePreset?: StylePreset
  tags?: TagCollection[]
  user?: User
}

export const defaultContext = {
  isLoading: true,
  prompt: LocalStorage.getPrompt(),
  setIsLoading: () => {},
  setPrompt: (prompt?:Prompt) => {},
  setStylePreset: (stylePreset?: StylePreset) => {},
  setTags: (tags?: TagCollection[]) => {},
  setUser: (user?:User) => {},
  stylePreset: undefined,
  tags: LocalStorage.getTags(),
  user: undefined,
}

const AppContext = createContext<AppContextProps>(defaultContext)

export default AppContext

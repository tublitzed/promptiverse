import { createContext } from 'react'
import { User, Prompt, TagCollection } from '@types'
import LocalStorage from '@utils/localStorage'

export interface AppContextProps {
  isLoading: boolean
  prompt?:Prompt
  setIsLoading: (isLoading: boolean) => void
  setPrompt: (prompt?:Prompt) => void
  setTags: (tags?: TagCollection[]) => void
  setUser: (user?: any) => void
  tags?: TagCollection[]
  user?: User
}

export const defaultContext = {
  isLoading: true,
  prompt: LocalStorage.getPrompt(),
  setIsLoading: () => {},
  setPrompt: (prompt?:Prompt) => {},
  setTags: (tags?: TagCollection[]) => {},
  setUser: (user?:User) => {},
  tags: undefined,
  user: undefined,
}

const AppContext = createContext<AppContextProps>(defaultContext)

export default AppContext

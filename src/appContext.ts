import { createContext } from 'react'
import { User, Prompt } from '@types'
import LocalStorage from '@utils/localStorage'

export interface AppContextProps {
  isLoading: boolean
  prompt?:Prompt
  setIsLoading: (isLoading: boolean) => void
  setPrompt: (prompt?:Prompt) => void
  setUser: (user?: any) => void
  user?: User
}

export const defaultContext = {
  isLoading: true,
  prompt: LocalStorage.getPrompt(),
  setIsLoading: () => {},
  setPrompt: (prompt?:Prompt) => {},
  setUser: (user?:User) => {},
  user: undefined,
}

const AppContext = createContext<AppContextProps>(defaultContext)

export default AppContext

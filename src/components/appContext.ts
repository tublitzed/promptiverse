import { createContext } from 'react'
import { User, Image, Prompt } from 'interfaces'

export interface AppContextProps {
  isLoading: boolean
  prompt?:Prompt
  image?:Image
  setIsLoading: (isLoading: boolean) => void
  setPrompt: (prompt?:Prompt) => void
  setUser: (user?: any) => void
  setImage: (Image?: any) => void
  user?: User
}

export const defaultContext = {
  isLoading: true,
  prompt: undefined,
  image: undefined,
  setImage: (image?: Image) => {},
  setIsLoading: () => {},
  setPrompt: (prompt?:Prompt) => {},
  setUser: (user?:User) => {},
  user: undefined,
}

const AppContext = createContext<AppContextProps>(defaultContext)

export default AppContext

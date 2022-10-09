import { Prompt } from '@types'
const localStorageNamespace = 'promptiverse'

const LocalStorage = {
  localStorageExists: () => {
    return typeof window !== 'undefined' && typeof window?.localStorage !== 'undefined'
  },

  setPrompt: (prompt?: Prompt) => {
    console.log('trying to set in ls: ', prompt)
    if (!LocalStorage.localStorageExists() || !prompt) {
      return
    }
    localStorage.setItem(`${localStorageNamespace}.prompt`, JSON.stringify(prompt))
  },

  getPrompt: ():Prompt | undefined => {
    if (!LocalStorage.localStorageExists()) {
      return
    }
    const val = localStorage.getItem(`${localStorageNamespace}.prompt`)
    if (!val) {
      return
    }
    return JSON.parse(val)
  },
}

export default LocalStorage

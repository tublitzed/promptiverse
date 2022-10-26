import { Prompt, TagCollection } from '@types'
const localStorageNamespace = 'promptiverse'

const LocalStorage = {
  localStorageExists: () => {
    return typeof window !== 'undefined' && typeof window?.localStorage !== 'undefined'
  },

  setItem: (item:any, itemStr: string) => {
    if (!LocalStorage.localStorageExists() || !item) {
      return
    }
    localStorage.setItem(`${localStorageNamespace}.${itemStr}`, JSON.stringify(item))
  },

  getItem: (itemStr: string) => {
    if (!LocalStorage.localStorageExists()) {
      return
    }
    const val = localStorage.getItem(`${localStorageNamespace}.${itemStr}`)
    if (!val) {
      return
    }
    return JSON.parse(val)
  },

  setPrompt: (prompt?: Prompt) => {
    return LocalStorage.setItem(prompt, 'prompt')
  },

  getPrompt: ():Prompt | undefined => {
    return LocalStorage.getItem('prompt')
  },

  setTags: (tagCollections?: TagCollection[]) => {
    return LocalStorage.setItem(tagCollections, 'tags')
  },

  getTags: ():TagCollection[] | undefined => {
    return LocalStorage.getItem('tags')
  },
}

export default LocalStorage

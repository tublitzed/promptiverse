import { Prompt, TagCollection, Tag } from '@types'
const localStorageNamespace = 'promptiverse'
type itemTypeKeys = 'tags' | 'prompt' | 'latestTagUpdatedAt'

const LocalStorage = {
  localStorageExists: () => {
    return typeof window !== 'undefined' && typeof window?.localStorage !== 'undefined'
  },

  setItem: (item:any, itemStr: itemTypeKeys) => {
    if (!LocalStorage.localStorageExists() || !item) {
      return
    }
    localStorage.setItem(`${localStorageNamespace}.${itemStr}`, JSON.stringify(item))
  },

  getItem: (itemStr: itemTypeKeys) => {
    if (!LocalStorage.localStorageExists()) {
      return
    }
    const val = localStorage.getItem(`${localStorageNamespace}.${itemStr}`)
    if (!val) {
      return
    }
    return JSON.parse(val)
  },

  clearItem: (itemStr: itemTypeKeys) => {
    if (!LocalStorage.localStorageExists()) {
      return
    }
    return localStorage.removeItem(`${localStorageNamespace}.${itemStr}`)
  },

  setPrompt: (prompt?: Prompt) => {
    return LocalStorage.setItem(prompt, 'prompt')
  },

  getPrompt: ():Prompt | undefined => {
    return LocalStorage.getItem('prompt')
  },

  setTags: (tagCollections: TagCollection[], latestTagUpdatedAt?: Date) => {
    LocalStorage.setItem(tagCollections, 'tags')
    if (latestTagUpdatedAt) {
      LocalStorage.setItem(latestTagUpdatedAt, 'latestTagUpdatedAt')
    }
  },

  getTags: ():TagCollection[] | undefined => {
    return LocalStorage.getItem('tags')
  },
}

export default LocalStorage

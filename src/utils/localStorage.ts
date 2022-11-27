import { Prompt, TagCollection } from '@types'
const localStorageNamespace = 'promptiverse'
type itemTypeKeys = 'tags' | 'prompt'

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

  // Clear tags if they were saved when public and then logged in.
  // Clear tags if they were saved when authed and then logged out.
  needToClearTags: (isAuthed: boolean) => {
    const existingTags = LocalStorage.getTags()
    const tagsExistAndAreEmpty = ((Array.isArray(existingTags)) && !existingTags.length)
    if (!existingTags || tagsExistAndAreEmpty) {
      return false
    }
    const existingTagsArePublic = existingTags[0].category.is_public
    if (isAuthed) {
      return existingTagsArePublic
    }
    return !existingTagsArePublic
  },

  setTags: (tagCollections?: TagCollection[]) => {
    return LocalStorage.setItem(tagCollections, 'tags')
  },

  getTags: ():TagCollection[] | undefined => {
    return LocalStorage.getItem('tags')
  },
}

export default LocalStorage

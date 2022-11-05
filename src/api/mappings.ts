import { Tag, TagCategory, PromptApiResponse, Prompt, TagApiResponse } from '@types'

// TODO: this should happen server side at query time, or else probably not at all for large lists.
export const mapPromptToTypes = (prompt: PromptApiResponse):Prompt => {
  return {
    ...prompt,
    imgUrl: prompt.img_url,
    promptRaw: prompt.prompt_raw,
    loading: false,
  }
}

export const mapPromptListToTypes = (prompts: PromptApiResponse[]):Prompt[] => {
  return prompts.map(p => mapPromptToTypes(p))
}

export const mapTagToTypes = (tag: TagApiResponse):Tag => {
  return {
    ...tag,
    tagCategory: tag.tag_category,
  }
}

export const mapTagListToTypes = (tags: TagApiResponse[]):Tag[] => {
  return tags.map(t => mapTagToTypes(t))
}

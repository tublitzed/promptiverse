import React from 'react'
import Select, { MultiValue } from 'react-select'
import Api from '@api/api'
import Input from './base/Input'
import Tags, { getSelectedTagIds } from './tags/Tags'
import Image from './Image'
import Button from './base/Button'
import AppContext from '@src/appContext'
import { Tag, TagCollection, TagCategory } from '@types'
import LocalStorage from '@utils/localStorage'


const buildPrompt = (rawPrompt: string, tags: TagCollection[]):string => {
  if (!tags.length) {
    return rawPrompt
  }
  return rawPrompt
}

const PromptComponent = () => {
  const { setPrompt, prompt, user, tags } = React.useContext(AppContext)
  const [seed, setSeed] = React.useState<number | undefined>(prompt?.seed)

  const submit = async () => {
    setPrompt({
      ...prompt,
      loading: true,
    })
    const promptWithTags = buildPrompt(prompt.promptRaw, tags)
    const response = await Api.generateImage({
      prompt: promptWithTags,
      promptRaw: prompt.promptRaw,
      accessToken: user.access_token,
      seed,
      tagIds: getSelectedTagIds(tags),
    })

    console.log(response)
    if (!response.prompt) {
      console.error(`Unable to generate prompt`, response)
      setPrompt({
        ...prompt,
        loading: false,
      })
      return
    }

    const newPromptVal = {
      ...response.prompt,
      loading: false,
    }
    setPrompt(newPromptVal)
    LocalStorage.setPrompt(newPromptVal)
    LocalStorage.setTags(tags)
    setSeed(newPromptVal.seed)
  }


  const setPromptRaw = (newVal:string) => {
    setPrompt({
      ...prompt,
      promptRaw: newVal,
    })
  }

  return (
    <div>
      <div className="flex flex-row gap-x-2">
        <Input
          value={prompt?.promptRaw || ''}
          onChange={setPromptRaw}
          className="grow"
          placeholder="enter a prompt, like 'cat dancing on the moon'"
          disabled={prompt.loading}
          autoFocus
        />
        <Input
          className="w-24"
          placeholder="Seed?"
          value={prompt?.seed || undefined}
          type="number"
          onChange={(value: any) => {
            setSeed(typeof value !== 'undefined' ? parseInt(value, 10) : undefined)
          }}
          disabled={prompt.loading}
        />
        <Button
          onClick={submit}
          disabled={prompt.loading}
          className="min-w-[150px]"
        >Go!</Button>
      </div>
      <Tags />
      <div>
        <Image />
      </div>
    </div>
  )
}

export default PromptComponent

import React from 'react'
import Select, { MultiValue } from 'react-select'
import Api from '@api/api'
import Input from './base/Input'
import Tags from './tags/Tags'
import Image from './Image'
import Button from './base/Button'
import AppContext from '@src/appContext'
import { Tag, Tag_Category } from '@types'
import LocalStorage from '@utils/localStorage'

export type SelectedTagCategories = {
  [k:string]: {
    tagId: string,
  }
}

const PromptGenerator = () => {
  const { setPrompt, prompt, user } = React.useContext(AppContext)
  const [promptRaw, setPromptRaw] = React.useState<string>(prompt?.promptRaw)
  const [seed, setSeed] = React.useState<number | undefined>(prompt?.seed)
  const [tags, setTags] = React.useState<SelectedTagCategories>({})

  const submit = async () => {
    if (typeof promptRaw !== 'string' || promptRaw.trim() === '') {
      return
    }
    setPrompt({
      ...prompt,
      loading: true,
    })
    const response = await Api.generateImage({
      prompt: promptRaw,
      promptRaw,
      accessToken: user.access_token,
      seed,
      tagIds: [],
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
    // setSeed(newPromptVal.seed)
  }

  const onTagChange = (changedTags:Tag[], categoryId: Tag_Category['id']) => {
    setTags({
      ...tags,
      [categoryId]: changedTags,
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
      <Tags onChange={onTagChange}/>
      <div>
        <Image />
      </div>
    </div>
  )
}

export default PromptGenerator

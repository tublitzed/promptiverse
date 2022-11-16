import React from 'react'
import Api from '@api/api'
import Input from './base/Input'
import Tags, { getSelectedTagIds } from './tags/Tags'
import PromptImage from './PromptImage'
import Button from './base/Button'
import AppContext from '@src/appContext'
import LocalStorage from '@utils/localStorage'

const PromptComponent = () => {
  const { setPrompt, prompt, user, tags } = React.useContext(AppContext)
  const [seed, setSeed] = React.useState<number | undefined>(prompt?.seed)

  const submit = async () => {
    setPrompt({
      ...prompt,
      loading: true,
    })
    const response = await Api.generateImage({
      promptRaw: prompt.promptRaw,
      accessToken: user?.access_token,
      seed,
      tagIds: getSelectedTagIds(tags),
    })

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
    setSeed(newPromptVal.seed)
    LocalStorage.setPrompt(newPromptVal)
    LocalStorage.setTags(tags)
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
          disabled={prompt?.loading}
          autoFocus
        />
        <Input
          className="w-24"
          placeholder="Seed?"
          value={seed}
          type="number"
          onChange={(value: string) => {
            const possibleNumber = typeof value === 'string' ? parseInt(value.trim(), 10) : undefined
            if (typeof possibleNumber === 'number' && !isNaN(possibleNumber)) {
              return setSeed(possibleNumber)
            }
            setSeed(undefined)
          }}
          disabled={prompt?.loading}
        />
        <Button
          onClick={submit}
          disabled={prompt?.loading}
          className="min-w-[150px]"
        >Go!</Button>
      </div>
      <Tags />
      <div>
        <PromptImage />
      </div>
    </div>
  )
}

export default PromptComponent

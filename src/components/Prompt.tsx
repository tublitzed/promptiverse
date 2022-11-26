import React from 'react'
import Api from '@api/api'
import Input from './base/Input'
import Tags, { getSelectedTagIds } from './tags/Tags'
import PromptImage from './PromptImage'
import Button from './base/Button'
import AppContext from '@src/appContext'
import LocalStorage from '@utils/localStorage'
import Loader from './base/Loader'
import Alert from '@components/base/Alert'

const PromptComponent = () => {
  const { setPrompt, prompt, user, tags } = React.useContext(AppContext)
  const [seed, setSeed] = React.useState<number | undefined>(prompt?.seed)
  const [promptRawError, setPromptRawError] = React.useState<string>()
  const [isGenerating, setIsGenerating] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string|undefined>()

  const submit = async () => {
    setError(undefined)
    if (!prompt || !prompt?.promptRaw || prompt.promptRaw === '') {
      return setPromptRawError('Missing required prompt.')
    }
    setIsGenerating(true)
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

    if (response.status === 'error' || !response.data.prompt) {
      console.error(`Unable to generate prompt`, response)
      setError(response?.error || 'Unable to generate prompt')
      setPrompt({
        ...prompt,
        loading: false,
      })
      setIsGenerating(false)
      return
    }

    const newPromptVal = {
      ...response.data.prompt,
      loading: false,
    }
    setPrompt(newPromptVal)
    setSeed(newPromptVal.seed)
    setIsGenerating(false)
    LocalStorage.setPrompt(newPromptVal)
    LocalStorage.setTags(tags)
    setError(undefined)
  }

  const setPromptRaw = (newVal:string) => {
    setPrompt({
      ...prompt,
      promptRaw: newVal,
    })
    setPromptRawError('')
  }

  return (
    <div>
      {error &&
        <Alert message={error} show className="my-4"/>
      }
      <div className="flex flex-row gap-x-2">
        <Input
          value={prompt?.promptRaw || ''}
          onChange={setPromptRaw}
          className="grow"
          placeholder="enter a prompt, like 'cat dancing on the moon'"
          disabled={prompt?.loading}
          autoFocus
          error={promptRawError}
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
        >Generate Image</Button>
      </div>
      <Tags />
      <div>
        {isGenerating
          ?
            <div className="mt-8"><Loader text="Building your image..." /></div>
          : <PromptImage />}
      </div>
    </div>
  )
}

export default PromptComponent

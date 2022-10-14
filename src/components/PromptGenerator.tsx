import React from 'react'
import Api from '../api/api'
import Button from '@components/base/Button'
import AppContext from '@src/appContext'
import Input from '@components/base/Input'
import Image from '@components/Image'
import LocalStorage from '../utils/localStorage'

const PromptGenerator = () => {
  const { setPrompt, prompt, user } = React.useContext(AppContext)
  const [promptString, setPromptString] = React.useState<string>(prompt?.value)

  const submit = async () => {
    if (typeof promptString !== 'string' || promptString.trim() === '') {
      return
    }
    setPrompt({
      ...prompt,
      loading: true,
    })
    const response = await Api.generateImage(promptString, user.access_token)
    if (!response.prompt) {
      console.error(`Unable to generate prompt`, response)
      setPrompt({
        ...prompt,
        loading: false,
      })
      return
    }

    const { prompt: promptResp } = response
    const newPromptVal = {
      id: promptResp.id,
      imgUrl: promptResp.img_url,
      version: promptResp.version,
      value: promptString,
      loading: false,
    }
    setPrompt(newPromptVal)
    LocalStorage.setPrompt(newPromptVal)
  }
  return (
    <div>
      <div className="flex flex-row gap-x-2">
        <Input
          value={prompt?.value || ''}
          onChange={setPromptString}
          className="grow"
          placeholder="enter a prompt, like 'cat dancing on the moon'"
          disabled={prompt.loading}
          autoFocus />
        <Button
          onClick={submit}
          disabled={prompt.loading}
        >Go!</Button>
      </div>
      <div>
        <Image />
      </div>
    </div>
  )
}

export default PromptGenerator

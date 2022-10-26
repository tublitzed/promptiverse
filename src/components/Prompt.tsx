import React from 'react'
import Select, { MultiValue } from 'react-select'
import Api from '@api/api'
import Input from './base/Input'
import Tags from './tags/Tags'
import Image from './Image'
import Button from './base/Button'
import AppContext from '@src/appContext'
import { Tag, TagCollection, TagCategory } from '@types'
import LocalStorage from '@utils/localStorage'


const buildPrompt = (rawPrompt: string, tags: TagCollection[]):string => {
  console.log(tags)
  if (!tags.length) {
    return rawPrompt
  }
  return rawPrompt
}

const PromptComponent = () => {
  const { setPrompt, prompt, user, tags } = React.useContext(AppContext)
  const [seed, setSeed] = React.useState<number | undefined>(prompt?.seed)

  const submit = async () => {
    console.log('submit', prompt, tags)
    // if (typeof promptRaw !== 'string' || promptRaw.trim() === '') {
    //   return
    // }
    // // setPrompt({
    // //   ...prompt,
    // //   loading: true,
    // // })
    // const prompt = buildPrompt(promptRaw, tags)
    // const response = await Api.generateImage({
    //   prompt,
    //   promptRaw,
    //   accessToken: user.access_token,
    //   seed,
    //   tagIds: [],
    // })

    // console.log(response)
    // if (!response.prompt) {
    //   console.error(`Unable to generate prompt`, response)
    //   // setPrompt({
    //   //   ...prompt,
    //   //   loading: false,
    //   // })
    //   return
    // }

    // const newPromptVal = {
    //   ...response.prompt,
    //   loading: false,
    // }
    // setPrompt(newPromptVal)
    // LocalStorage.setPrompt(newPromptVal)
    // setSeed(newPromptVal.seed)
  }


  const setPromptRaw = (newVal:string) => {
    console.log(newVal)
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

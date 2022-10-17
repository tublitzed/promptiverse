import React from 'react'
import Select, { MultiValue } from 'react-select'
import Api from '../api/api'
import Button from '@components/base/Button'
import AppContext from '@src/appContext'
import Input from '@components/base/Input'
import Image from '@components/Image'
import LocalStorage from '../utils/localStorage'

// TODO: Fix imports!
import { artistTags, descriptiveTags } from '../utils/tags'

const PromptGenerator = () => {
  const { setPrompt, prompt, user } = React.useContext(AppContext)
  const [value, setValue] = React.useState<string>(prompt?.value)
  const [seed, setSeed] = React.useState<number | undefined>(prompt?.seed)

  const submit = async () => {
    if (typeof value !== 'string' || value.trim() === '') {
      return
    }
    setPrompt({
      ...prompt,
      loading: true,
    })
    const response = await Api.generateImage(value, user.access_token, seed)
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
      loading: false,
      seed: promptResp.seed,
      value,
      version: promptResp.version,
    }
    setPrompt(newPromptVal)
    LocalStorage.setPrompt(newPromptVal)
  }

  const selectStyles = {
    // https://react-select.com/styles#style-object
    // option: (provided:any, state:any) => {
    //   console.log(provided, state)
    //   return provided
    // },
    control: (provided:any, state:any) => {
      return {
        ...provided,
        // backgroundColor: state.isFocused ? '#FFF' : 'rgb(229 231 235 / var(--tw-bg-opacity))',
      }
    },
  }

  const customSelectTheme = (provided:any) => {
    // console.log(provided)
    return {
      ...provided,
      colors: {
        ...provided.colors,
        // primary: '#3b82f6',
        // primary25: '#dbeafe',
        // primary50: '#93c5fd',
        // primary75: '#60a5fa',
      },
    }
  }
  return (
    <div>
      <div className="flex flex-row gap-x-2">
        <Input
          value={prompt?.value || ''}
          onChange={setValue}
          className="grow"
          placeholder="enter a prompt, like 'cat dancing on the moon'"
          disabled={prompt.loading}
          autoFocus />
        <Input
          className="w-24"
          placeholder="Seed?"
          type="number"
          onChange={(value: any) => {
            setSeed(typeof value !== 'undefined' ? parseInt(value, 10) : undefined)
          }}
          disabled={prompt.loading}
        />
        <Button
          onClick={submit}
          disabled={prompt.loading}
        >Go!</Button>
      </div>
      <div className="mt-4 text-slate-600 text-sm">
        <Select
          placeholder="Add artists..."
          options={artistTags}
          styles={selectStyles}
          theme={customSelectTheme}
          isMulti
          onChange={(selectedValues:MultiValue<{}>) => {
            console.log(selectedValues)
          }}
        />
      </div>
      <div className="mt-4 text-slate-600 text-sm">
        <Select
          placeholder="Add descriptive words..."
          options={descriptiveTags}
          styles={selectStyles}
          theme={customSelectTheme}
          isMulti
          onChange={(selectedValues:MultiValue<{}>) => {
            console.log(selectedValues)
          }}
        />
      </div>
      <div>
        <Image />
      </div>
    </div>
  )
}

export default PromptGenerator

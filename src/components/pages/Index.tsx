import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import ApiService from '@services/api-service'
import Layout from '@components/layouts/Layout'
import Button from '@components/base/Button'
import AppContext from '@src/appContext'
import Input from '@components/base/Input'
import Image from '@components/base/Image'
import LocalStorage from '../../utils/localStorage'

const API_SERVER_URL = ApiService.getVar('API_SERVER_URL')

const Page: React.FC<{}> = ({}) => {
  const { setPrompt, prompt, user } = React.useContext(AppContext)
  const [promptString, setPromptString] = React.useState<string>()

  const submit = () => {
    setPrompt({
      ...prompt,
      value: promptString,
      id: uuidv4(), // set a unique id with each generation so we know whether to use what's in local storage or not.
      loading: true,
    })
  }

  React.useEffect(() => {
    async function fetchData(promptValue:string) {
      const response = await ApiService.getImage(promptValue, user.access_token)
      if (response?.error) {
        console.error(`Unable to generated for prompt! ${response.error}`)
        return
      }
      if (!response?.file) {
        console.error('Missing required file')
        return
      }
      const url = `${API_SERVER_URL}/${response.file}`
      const newPromptVal = {
        ...prompt,
        url,
        loading: false,
      }
      setPrompt(newPromptVal)
      LocalStorage.setPrompt(newPromptVal)
    }
    const hasNewPromptId = LocalStorage.getPrompt()?.id !== prompt?.id
    if (prompt?.value && hasNewPromptId) {
      fetchData(prompt?.value)
    }
  }, [
    prompt,
    setPrompt,
  ])
  return (
    <Layout>
      <div className="flex flex-row gap-x-2">
        <Input
          value={prompt?.value || ''}
          onChange={setPromptString}
          className="grow"
          placeholder="enter a prompt, like 'cat dancing on the moon'"
          autoFocus />
        <Button onClick={submit}>Go!</Button>
      </div>
      <div>
        <Image />
      </div>
    </Layout>
  )
}

export default Page

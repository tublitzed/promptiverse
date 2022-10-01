import React from 'react'
import Api from 'lib/api'
import Button from 'components/Button'
import AppContext from 'components/appContext'
import Input from 'components/Input'
import Image from 'components/Image'
export const API_URL = process.env.NEXT_PUBLIC_API_URL

const Index = () => {
  const { setPrompt, prompt, setImage } = React.useContext(AppContext)
  const [promptState, updatePromptState] = React.useState<string>()

  const submit = () => {
    setPrompt({ prompt: promptState })
  }

  React.useEffect(() => {
    async function fetchData(prompt:string) {
      setImage({
        loading: true,
        url: undefined,
      })
      const response = await Api.getImage(prompt)
      if (response.file) {
        setImage({
          loading: false,
          url: `${API_URL}/${response.file}`,
        })
      }
    }
    if (prompt?.prompt) {
      fetchData(prompt?.prompt)
    }
  }, [
    prompt,
    setImage,
  ])
  return (
    <div>
      <div className="flex flex-row gap-x-2">
        <Input
          onChange={updatePromptState}
          className="grow"
          placeholder="enter a prompt, like 'cat dancing on the moon'"
          autoFocus />
        <Button onClick={submit}>Go!</Button>
      </div>
      <div>
        <Image />
      </div>
    </div>
  )
}

export default Index

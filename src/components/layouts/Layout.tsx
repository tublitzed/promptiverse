import React from 'react'
import Error from 'next/error'
import { useRouter } from 'next/router'
import HeadComponent from 'components/layouts/Head'
import Header from 'components/Header'
import Button from 'components/Button'
import App from 'components/App'
import AppContext, { defaultContext } from 'components/appContext'
import { useFetchUser } from 'lib/user'
import { Image, Prompt, User } from 'interfaces'

export interface Props {
  children?: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const router = useRouter()
  const { user: userViaSWR, loading: loadingViaSWR } = useFetchUser()
  const [user, setUser] = React.useState<any | undefined>(userViaSWR)
  const [isLoading, setIsLoading] = React.useState<boolean>(defaultContext.isLoading)
  const [image, setImage] = React.useState<Image | undefined>(defaultContext.image)
  const [prompt, setPrompt] = React.useState<Prompt | undefined>(defaultContext.prompt)

  React.useEffect(() => {
    if (userViaSWR) {
      setUser(userViaSWR)
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }, [
    userViaSWR,
    isLoading,
  ])

  if (!user && !isLoading) {
    return (
      router.pathname === '/'
        ? <>
            <HeadComponent />
            <main className="bg-slate-600 w-full min-h-screen">
              <div className="container mx-auto h-full">
                <div className="py-6 px-8">
                  <div className="flex justify-end">
                    <Button href="/api/login" className="m-6">
            Login
                    </Button>
                  </div>
                </div>
              </div>
            </main>
          </>
        : <Error statusCode={403} />
    )
  }

  const defaultCtx = {
    user,
    isLoading,
    setUser,
    setIsLoading,
    prompt,
    setPrompt,
    image,
    setImage,
  }

  return (
    <AppContext.Provider value={defaultCtx}>
      <App>{children}</App>
    </AppContext.Provider>
  )
}

export default Layout

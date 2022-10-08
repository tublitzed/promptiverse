import React from 'react'
import Header from '@components/base/Header'
import AppContext, { defaultContext } from '@src/appContext'
import { useAuth0, Auth0Provider, AppState } from '@auth0/auth0-react'
import { Prompt, User } from '@types'
import { LoginButton } from '@components/buttons/login-button'
import ApiService from '@services/api-service'
const API_SERVER_URL = ApiService.getVar('API_SERVER_URL')

export interface Props {
  children: React.ReactNode
}

const Layout = ({ children }:Props): JSX.Element => {
  const { user: userViaAuth0 } = useAuth0()
  const [user, setUser] = React.useState<any | undefined>(userViaAuth0)
  const [isLoading, setIsLoading] = React.useState<boolean>(defaultContext.isLoading)
  const [prompt, setPrompt] = React.useState<Prompt | undefined>(defaultContext.prompt)

  const { getAccessTokenSilently } = useAuth0()
  const verifyApiAuthIsWorking = async () => {
    const accessToken = await getAccessTokenSilently()
    console.log(accessToken)
    // const testUrl = `${process.env.NEXT_PUBLIC_API_URL}api/private`
    // const authResp = await fetcher(testUrl, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${accessToken}`,
    //   },
    // })
    // console.log(authResp)
  }
  verifyApiAuthIsWorking()

  const defaultCtx = {
    user,
    isLoading,
    setUser,
    setIsLoading,
    prompt,
    setPrompt,
  }

  if (!user) {
    return (
      <main className="bg-slate-600 w-full min-h-screen">
        <div className="container mx-auto h-full">
          <div className="mx-auto text-center p-12 text-white">
            <LoginButton />
          </div>
        </div>
      </main>
    )
  }

  return (
    <AppContext.Provider value={defaultCtx}>
      <main className="bg-slate-600 w-full min-h-screen">
        <Header />
        <div className="container mx-auto h-full">
          <div className="py-6 px-8">
            {children}
          </div>
        </div>
      </main>
    </AppContext.Provider>
  )
}

export default Layout

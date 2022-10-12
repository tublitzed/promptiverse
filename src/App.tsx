import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ProtectedRoute } from './components/protected-route'
import AdminPage from '@components/pages/Admin'
import IndexPage from '@components/pages/Index'
import ProfilePage from '@components/pages/Profile'
import SandboxPage from '@components/pages/Sandbox'
import CallbackPage from '@components/pages/Callback'
import PublicPage from '@components/pages/Public'
import NotFoundPage from '@components/pages/404'
import ProtectedPage from '@components/pages/Protected'
import AboutPage from '@components/pages/About'
import AppContext, { defaultContext } from '@src/appContext'
import { Prompt } from '@types'

export const App: React.FC = () => {
  const {
    user: userViaAuth0,
    loginWithRedirect,
    isLoading: isLoadingViaAuth0,
    getAccessTokenSilently,
  } = useAuth0()
  const [user, setUser] = React.useState<any | undefined>(userViaAuth0)
  const [isLoading, setIsLoading] = React.useState<boolean>(isLoadingViaAuth0)
  const [prompt, setPrompt] = React.useState<Prompt | undefined>(defaultContext.prompt)

  React.useEffect(() => {
    setIsLoading(isLoadingViaAuth0)
  }, [isLoadingViaAuth0])

  React.useEffect(() => {
    // Can also use hook
    setUser(userViaAuth0)
    const getAccessToken = async () => {
      const token = await getAccessTokenSilently()
      setUser({
        ...userViaAuth0,
        access_token: token,
      })
    }
    if (userViaAuth0) {
      getAccessToken()
    }
  }, [userViaAuth0])

  if (isLoading) {
    return (
      <main className="bg-slate-600 w-full min-h-screen">
        <div className="container mx-auto h-full">
          <div className="mx-auto text-center p-12 text-white">
            <div className="text-center py-24 text-xl font-thin">Loading...</div>
          </div>
        </div>
      </main>
    )
  }

  const defaultCtx = {
    user,
    isLoading,
    setUser,
    setIsLoading,
    prompt,
    setPrompt,
  }

  return (
    <AppContext.Provider value={defaultCtx}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <ProtectedRoute path="/profile" component={ProfilePage} />
        <ProtectedRoute path="/about" component={AboutPage} />
        <ProtectedRoute path="/protected" component={ProtectedPage} />
        <ProtectedRoute path="/sandbox" component={SandboxPage} />
        <ProtectedRoute path="/admin" component={AdminPage} />
        <Route path="/public" component={PublicPage} />
        <Route path="/callback" component={CallbackPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </AppContext.Provider>
  )
}

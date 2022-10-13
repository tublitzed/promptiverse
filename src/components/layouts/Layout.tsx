import React from 'react'
import Header from '@components/Header'
import { useAuth0 } from '@auth0/auth0-react'
import { Prompt, User } from '@types'
import Button from '@components/base/Button'
import Api from '../../api/api'
const API_SERVER_URL = Api.getVar('API_SERVER_URL')

export interface Props {
  children: React.ReactNode
}

const Layout = ({ children }:Props): JSX.Element => {
  const { loginWithRedirect, user } = useAuth0()

  const handleLogin = async () => {
    await loginWithRedirect({
      prompt: 'login',
      appState: {
        returnTo: '/',
      },
    })
  }

  if (!user) {
    return (
      <main className="bg-slate-600 w-full min-h-screen">
        <div className="container mx-auto h-full">
          <div className="mx-auto text-center p-12 text-white">
            <Button
              onClick={handleLogin}
            >
              Sign In
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-slate-600 w-full min-h-screen">
      <Header />
      <div className="container mx-auto h-full">
        <div className="py-6 px-8">
          {children}
        </div>
      </div>
    </main>
  )
}

export default Layout

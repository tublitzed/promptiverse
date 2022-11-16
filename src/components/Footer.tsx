import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import Logo from '@components/base/Logo'
import { useAuth0 } from '@auth0/auth0-react'
import ApiService from '@api/api'

const Footer: React.FC = () => {
  const routerHistory = useHistory()
  const linkStyle = 'text-sm text-red-400 mx-2 md:mx-10 hover:underline pt-2'
  const { loginWithRedirect } = useAuth0()

  const goToPage = (path:string) => {
    routerHistory.push(path)
  }

  const handleLogin = async () => {
    await loginWithRedirect({
      prompt: 'login',
      appState: {
        returnTo: '/',
      },
    })
  }

  const enableSignup = ApiService.getVar('ENABLE_SIGNUP') === true
  return (
    <footer className="bg-red-50 p-6 mt-12 border-t border-red-100">
      <div className="flex container mx-auto justify-center">
        <a
          href=""
          className={linkStyle}
          onClick={() => goToPage('/')}
        >
        Home
        </a>
        <a
          href=""
          className={linkStyle}
          onClick={() => goToPage('/builder')}
        >
        Builder
        </a>
        <a
          href=""
          className={linkStyle}
          onClick={() => goToPage('/about')}
        >
        About
        </a>
        <div className="pt-1 w-10 md:w-12 md:pt-0 mx-2 md:mx-8">
          <Logo
            iconOnly
            linkedToHome={false}
          />
        </div>

        <a
          href=""
          className={linkStyle}
          onClick={handleLogin}
        >
        Sign In
        </a>
        {enableSignup && <a
          href=""
          className={linkStyle}
          onClick={() => goToPage('/signup')}
        >
        Sign Up
        </a>}
      </div>
    </footer>
  )
}

export default Footer

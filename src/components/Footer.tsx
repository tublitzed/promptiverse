import React from 'react'
import clsx from 'clsx'
import { useLocation, useHistory } from 'react-router-dom'
import Logo from '@components/base/Logo'
import { useAuth0 } from '@auth0/auth0-react'
import ApiService from '@api/api'


const Footer: React.FC = () => {
  const routerHistory = useHistory()
  const location = useLocation()

  const baseLinkStyle = 'text-sm text-red-400 mx-4 md:mx-10 pt-2'
  const activeLinkStyle = 'underline hover:no-underline'
  const inactiveLinkStyle = 'hover:underline'
  const { loginWithRedirect } = useAuth0()

  const goToPage = (path:string) => {
    routerHistory.push(path)
  }

  const handleLogin = async (e:React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
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
      <div className="w-10 pb-4 mx-auto block md:hidden">
        <Logo
          iconOnly
          linkedToHome={false}
        />
      </div>
      <div className="flex container mx-auto justify-center">
        <a
          href=""
          className={clsx(
            baseLinkStyle,
            location.pathname === '/' ? activeLinkStyle : inactiveLinkStyle,
          )}
          onClick={() => goToPage('/')}
        >
        Home
        </a>
        <a
          href=""
          className={clsx(
            baseLinkStyle,
            location.pathname === '/builder' ? activeLinkStyle : inactiveLinkStyle,
          )}
          onClick={() => goToPage('/builder')}
        >
        Builder
        </a>
        <a
          href=""
          className={clsx(
            baseLinkStyle,
            location.pathname === '/about' ? activeLinkStyle : inactiveLinkStyle,
          )}
          onClick={() => goToPage('/about')}
        >
        About
        </a>
        <div className="pt-1 w-10 md:w-12 md:pt-0 mx-2 md:mx-8 hidden md:block">
          <Logo
            iconOnly
            linkedToHome={false}
          />
        </div>
        <a
          href=""
          className={clsx(
            baseLinkStyle,
            location.pathname === '/signin' ? activeLinkStyle : inactiveLinkStyle,
          )}
          onClick={handleLogin}
        >
        Sign In
        </a>
        {enableSignup && <a
          href=""
          className={clsx(
            baseLinkStyle,
            location.pathname === '/signup' ? activeLinkStyle : inactiveLinkStyle,
          )}
          onClick={() => goToPage('/signup')}
        >
        Sign Up
        </a>}
      </div>
    </footer>
  )
}

export default Footer

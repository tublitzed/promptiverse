import React from 'react'
import clsx from 'clsx'
import { useAuth0 } from '@auth0/auth0-react'
import { Fragment } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Avatar from '@components/base/Avatar'
import Logo from '@components/base/Logo'
import Button from '@components/base/Button'
import AppContext from '@src/appContext'
import ApiService from '@api/api'

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

const PublicHeader = () => {
  const routerHistory = useHistory()
  const { loginWithRedirect, user } = useAuth0()

  const handleLogin = async () => {
    await loginWithRedirect({
      prompt: 'login',
      appState: {
        returnTo: '/',
      },
    })
  }

  const goToPage = (path:string) => {
    routerHistory.push(path)
  }

  const enableSignup = ApiService.getVar('ENABLE_SIGNUP') === true
  return (
    <header className="bg-gray-100 px-8">
      <div className="flex container mx-auto py-2 px-6">
        <div className="grow">
          <Logo className="w-[100px] md:w-[135px] block" />
        </div>
        <div>
          <div className="inline-flex mt-2">
            <Button
              onClick={handleLogin}
              size="med"
              variant="unfilled"
              className="whitespace-nowrap md:mr-2 mr-4"
            >
              Sign In
            </Button>
            {enableSignup && <Button
              size="med"
              variant="filled"
              style="primary"
              className="whitespace-nowrap"
              onClick={() => goToPage('/signup')}
            >Sign Up
            </Button>}
          </div>
        </div>
      </div>
    </header>
  )
}

export default PublicHeader

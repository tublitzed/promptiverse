import React from 'react'
import clsx from 'clsx'
import { useAuth0 } from '@auth0/auth0-react'
import { Fragment } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Avatar from '@components/base/Avatar'
import Logo from '@components/base/Logo'
import AppContext from '@src/appContext'
import Button from '@components/base/Button'

const Header = () => {
  const { logout } = useAuth0()

  const handleLogout = () => {
    logout({
      returnTo: window.location.origin,
    })
  }

  const routerHistory = useHistory()

  const goToPage = (path:string) => {
    routerHistory.push(path)
  }

  const { user } = React.useContext(AppContext)
  const activeNavLinkClassname = 'bg-gray-900 text-white'
  const navLinkClassname = 'text-gray-500 hover:bg-gray-700 hover:text-white'
  const location = useLocation()

  if (!user) {
    return null
  }

  return (
    <header className="bg-gray-100 px-8 border-b border-b-gray-200 border-t-2 border-t-red-100">
      <div className="flex container mx-auto py-2 px-6">
        <div>
          <Logo className="w-[100px] md:w-[135px] block" />
        </div>
        <div className="grow justify-end flex px-6 mt-6 gap-x-3">
          <Button
            onClick={() => goToPage('/')}
            size="med"
            variant="unfilled"
            className={clsx(
              'rounded-md px-3 py-2 text-sm font-medium cursor-pointer focus:ring-2 focus:ring-gray-300',
              (location.pathname === '/' || location.pathname === '/builder') ? activeNavLinkClassname : navLinkClassname,
            )}
            style="secondary"
          >
              Builder
          </Button>
          <Button
            onClick={() => goToPage('/images')}
            size="med"
            variant="unfilled"
            className={clsx(
              'rounded-md px-3 py-2 text-sm font-medium cursor-pointer',
              location.pathname === '/images' ? activeNavLinkClassname : navLinkClassname,
            )}
            style="secondary"
          >
              Images
          </Button>
        </div>
        <div>
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex items-center">
              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3 mt-6">
                <div>
                  <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none ring-2 ring-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Profile</span>
                    <Avatar />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          onClick={handleLogout}
                          className={clsx(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700 cursor-pointer',
                          )}
                        >
                              Sign Out
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

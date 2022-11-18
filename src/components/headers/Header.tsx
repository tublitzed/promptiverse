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

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

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
  const navLinkClassname = 'text-gray-300 hover:bg-gray-700 hover:text-white'
  const location = useLocation()

  if (!user) {
    return null
  }

  return (
    <header className="bg-gray-100 px-8">
      <div className="flex container mx-auto py-2">
        <div>
          <Logo className="w-[100px] md:w-[135px] block" />
        </div>
        <div className="grow px-12 mt-6">
          <Button
            onClick={() => goToPage('/builder')}
            size="med"
            variant="unfilled"
            className="whitespace-nowrap md:mr-2 mr-4"
            style="secondary"
          >
              Builder
          </Button>
          <Button
            onClick={() => goToPage('/images')}
            size="med"
            variant="unfilled"
            className="whitespace-nowrap md:mr-2 mr-4"
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
                  <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
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
                          onClick={() => goToPage('/profile')}
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700 cursor-pointer',
                          )}
                        >
                              My Profile
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          onClick={handleLogout}
                          className={classNames(
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
  // return (
  //   <header>
  //     <Disclosure as="nav" className="bg-gray-100">
  //       {({ open }) => (
  //         <>
  //           <div className="flex container mx-auto py-2">
  //             <div className="flex">
  //               <div className="grow">
  //                 <Logo className="w-[100px] md:w-[135px] block" />
  //                 <div className="hidden sm:ml-6 sm:block">
  //                   <div className="flex space-x-4">
  //                     {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
  //                     <a onClick={goToDashboard} className={clsx(
  //                       'rounded-md px-3 py-2 text-sm font-medium cursor-pointer',
  //                       location.pathname === '/' ? activeNavLinkClassname : navLinkClassname,
  //                     )}>
  //                     Dashboard
  //                     </a>
  //                     <a onClick={goToImages} className={clsx(
  //                       'rounded-md px-3 py-2 text-sm font-medium cursor-pointer',
  //                       location.pathname === '/images' ? activeNavLinkClassname : navLinkClassname,
  //                     )}>
  //                     Images
  //                     </a>
  //                     <a onClick={goToAboutPage} className={clsx(
  //                       'rounded-md px-3 py-2 text-sm font-medium cursor-pointer',
  //                       location.pathname === '/about' ? activeNavLinkClassname : navLinkClassname,
  //                     )}>
  //                     About
  //                     </a>
  //                   </div>
  //                 </div>
  //               </div>
  //               <div className="hidden sm:ml-6 sm:block">
  //                 <div className="flex items-center">
  //                   {/* Profile dropdown */}
  //                   <Menu as="div" className="relative ml-3">
  //                     <div>
  //                       <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
  //                         <span className="sr-only">Profile</span>
  //                         <Avatar />
  //                       </Menu.Button>
  //                     </div>
  //                     <Transition
  //                       as={Fragment}
  //                       enter="transition ease-out duration-100"
  //                       enterFrom="transform opacity-0 scale-95"
  //                       enterTo="transform opacity-100 scale-100"
  //                       leave="transition ease-in duration-75"
  //                       leaveFrom="transform opacity-100 scale-100"
  //                       leaveTo="transform opacity-0 scale-95"
  //                     >
  //                       <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
  //                         <Menu.Item>
  //                           {({ active }) => (
  //                             <a
  //                               onClick={goToProfile}
  //                               className={classNames(
  //                                 active ? 'bg-gray-100' : '',
  //                                 'block px-4 py-2 text-sm text-gray-700 cursor-pointer',
  //                               )}
  //                             >
  //                             My Profile
  //                             </a>
  //                           )}
  //                         </Menu.Item>
  //                         <Menu.Item>
  //                           {({ active }) => (
  //                             <a
  //                               onClick={handleLogout}
  //                               className={classNames(
  //                                 active ? 'bg-gray-100' : '',
  //                                 'block px-4 py-2 text-sm text-gray-700 cursor-pointer',
  //                               )}
  //                             >
  //                             Sign Out
  //                             </a>
  //                           )}
  //                         </Menu.Item>
  //                       </Menu.Items>
  //                     </Transition>
  //                   </Menu>
  //                 </div>
  //               </div>
  //               <div className="-mr-2 flex sm:hidden">
  //                 {/* Mobile menu button */}
  //                 <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
  //                   <span className="sr-only">Open main menu</span>
  //                   {open
  //                     ? (
  //                         <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
  //                       )
  //                     : (
  //                         <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
  //                       )}
  //                 </Disclosure.Button>
  //               </div>
  //             </div>
  //           </div>

  //           <Disclosure.Panel className="sm:hidden">
  //             <div className="space-y-1 px-2 pt-2 pb-3">
  //               {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
  //               <Disclosure.Button
  //                 as="a"
  //                 onClick={goToDashboard}
  //                 className={clsx(
  //                   'block rounded-md px-3 py-2 text-base font-medium cursor-pointer',
  //                   location.pathname === '/' ? activeNavLinkClassname : navLinkClassname,
  //                 )}
  //               >
  //               Dashboard
  //               </Disclosure.Button>
  //               <Disclosure.Button
  //                 as="a"
  //                 onClick={goToImages}
  //                 className={clsx(
  //                   'block rounded-md px-3 py-2 text-base font-medium cursor-pointer',
  //                   location.pathname === '/images' ? activeNavLinkClassname : navLinkClassname,
  //                 )}
  //               >
  //               Images
  //               </Disclosure.Button>
  //               <Disclosure.Button
  //                 as="a"
  //                 onClick={goToAboutPage}
  //                 className={clsx(
  //                   'block rounded-md px-3 py-2 text-base font-medium cursor-pointer',
  //                   location.pathname === '/about' ? activeNavLinkClassname : navLinkClassname,
  //                 )}
  //               >
  //               About
  //               </Disclosure.Button>
  //             </div>
  //             <div className="border-t border-gray-700 pt-4 pb-3">
  //               <div className="flex items-center px-5">
  //                 <div className="flex-shrink-0">
  //                   <Avatar />
  //                 </div>
  //                 <div className="ml-3">
  //                   <div className="text-base font-medium text-white">{user.nickname}</div>
  //                   <div className="text-sm font-medium text-gray-400">{user.name}</div>
  //                 </div>
  //               </div>
  //               <div className="mt-3 space-y-1 px-2">
  //                 <Disclosure.Button
  //                   as="a"
  //                   onClick={goToProfile}
  //                   className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer"
  //                 >
  //                 Your Profile
  //                 </Disclosure.Button>
  //                 <Disclosure.Button
  //                   as="a"
  //                   onClick={handleLogout}
  //                   className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer"
  //                 >
  //                 Sign Out
  //                 </Disclosure.Button>
  //               </div>
  //             </div>
  //           </Disclosure.Panel>
  //         </>
  //       )}
  //     </Disclosure>
  //   </header>
  // )
}

export default Header

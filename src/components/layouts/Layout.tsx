import React from 'react'
import Header from '@components/headers/Header'
import PublicHeader from '@components/headers/PublicHeader'
import { useAuth0 } from '@auth0/auth0-react'
import Button from '@components/base/Button'

export interface Props {
  children: React.ReactNode
}

const Layout = ({ children }:Props): JSX.Element => {
  const { user } = useAuth0()


  if (!user) {
    return (
      <main>
        <PublicHeader />
        <section className="container mx-auto">
          {children}
        </section>
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

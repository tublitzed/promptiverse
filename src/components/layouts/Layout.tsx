import React from 'react'
import Header from '@components/headers/Header'
import PublicHeader from '@components/headers/PublicHeader'
import { useAuth0 } from '@auth0/auth0-react'
import Hero from '@components/Hero'
import Footer from '@components/Footer'

export interface Props {
  children: React.ReactNode
  page?: 'INDEX' | 'CUSTOM',
  pageTitle?: string
}

const Layout = ({
  children,
  page,
  pageTitle,
}:Props): JSX.Element => {
  const { user } = useAuth0()

  React.useEffect(() => {
    if (pageTitle) {
      window.document.title = `Promptiverse | ${pageTitle}`
    }
  }, [pageTitle])


  if (!user) {
    return (
      <main className="overflow-x-hidden">
        <div className="min-h-screen">
          <PublicHeader />
          {page === 'INDEX' &&
            <Hero />
          }
          <section className="container mx-auto px-6">
            {children}
          </section>
        </div>
        <Footer />
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

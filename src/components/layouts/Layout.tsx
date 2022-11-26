import React from 'react'
import Header from '@components/headers/Header'
import PublicHeader from '@components/headers/PublicHeader'
import { useAuth0 } from '@auth0/auth0-react'
import Hero from '@components/Hero'
import Footer from '@components/Footer'
import PageTitleComponent from '@components/base/PageTitle'

export interface Props {
  children: React.ReactNode
  page?: 'INDEX' | 'CUSTOM',
  windowTitle?: string
  pageTitle?: string
  pageDescription?: string
}

const Layout = ({
  children,
  page,
  windowTitle,
  pageTitle,
  pageDescription,
}:Props): JSX.Element => {
  const { user } = useAuth0()

  React.useEffect(() => {
    if (windowTitle) {
      window.document.title = `Promptiverse | ${windowTitle}`
    }
  }, [windowTitle])


  return (
    <main className="overflow-x-hidden">
      <div className="min-h-screen">
        {user ? <Header /> : <PublicHeader />}
        {(page === 'INDEX' && !user) && <Hero />}
        <section className="container mx-auto px-6">
          {pageTitle && <PageTitleComponent title={pageTitle} subtitle={pageDescription} />}
          <div className="mt-4">
            {children}
          </div>
        </section>
      </div>
      {!user && <Footer />}
    </main>
  )
}

export default Layout

import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect } from 'react'
import Layout from '@components/layouts/Layout'
import ErrorLayout from '@components/layouts/ErrorLayout'

const Page: React.FC = () => {
  const { error, isLoading } = useAuth0()

  useEffect(() => {
    if (error) {
      console.error('Auth0 callback error:', error)
    }
  }, [error])

  if (error) {
    return (
      <ErrorLayout errorMessage="Unable to login. Please try again." />
    )
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-xl font-thin">Logging in...</div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-xl font-thin">Redirecting...</div>
        </div>
      </div>
    </Layout>
  )
}

export default Page

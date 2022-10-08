import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import Layout from '@components/layouts/Layout'
import ErrorLayout from '@components/layouts/ErrorLayout'

const Page: React.FC = () => {
  const { error } = useAuth0()
  console.error(error)
  if (error) {
    return (
      <ErrorLayout errorMessage="Unable to login." />
    )
  }

  return (
    <Layout>
    </Layout>
  )
}

export default Page

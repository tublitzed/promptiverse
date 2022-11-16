import React from 'react'
import Layout from '@components/layouts/Layout'
import { useAuth0 } from '@auth0/auth0-react'
import Prompt from '@components/Prompt'
import PublicBuilder from '@components/pages/public/Builder'
const Page: React.FC<{}> = () => {
  const { user } = useAuth0()
  return (
    <Layout pageTitle="Builder">
      {user ? <Prompt /> : <PublicBuilder />}
    </Layout>
  )
}

export default Page

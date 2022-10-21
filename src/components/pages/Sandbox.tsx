import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import Layout from '@components/layouts/Layout'
import getAccessToken from '@hooks/getAccessToken'
import Api from '@api/api'

const Page: React.FC = () => {
  const token = getAccessToken()
  const testSandboxApi = async () => {
    const resp = await Api.sandboxTest(token)
  }

  if (token) {
    testSandboxApi()
  }
  return (
    <Layout>
      <>sandbox</>
    </Layout>
  )
}

export default Page

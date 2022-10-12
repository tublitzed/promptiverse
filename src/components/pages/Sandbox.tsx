import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import Layout from '@components/layouts/Layout'
import getAccessToken from '@hooks/getAccessToken'
import ApiService from '@services/api-service'
const Page: React.FC = () => {
  const { user } = useAuth0()
  const token = getAccessToken()
  console.log(token)
  console.log('for messing with stuff')

  const testSandboxApi = async () => {
    const resp = await ApiService.sandboxTest(token)
    console.log(resp)
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

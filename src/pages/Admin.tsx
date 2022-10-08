import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect, useState } from 'react'
import { getAdminResource } from '../services/message.service'
import Layout from '@components/layouts/Layout'

const Page: React.FC = () => {
  const [message, setMessage] = useState<string>('')

  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    let isMounted = true

    const getMessage = async () => {
      const accessToken = await getAccessTokenSilently()
      const { data, error } = await getAdminResource(accessToken)

      if (!isMounted) {
        return
      }

      if (data) {
        setMessage(JSON.stringify(data, null, 2))
      }

      if (error) {
        setMessage(JSON.stringify(error, null, 2))
      }
    }

    getMessage()

    return () => {
      isMounted = false
    }
  }, [getAccessTokenSilently])

  return (
    <Layout>
      <div>
        Admin
      </div>
    </Layout>
  )
}

export default Page

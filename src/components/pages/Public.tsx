import React, { useEffect, useState } from 'react'
import { getPublicResource } from '@services/message.service'
import Layout from '@components/layouts/Layout'


const Page: React.FC = () => {
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    let isMounted = true

    const getMessage = async () => {
      const { data, error } = await getPublicResource()

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
  }, [])

  return (
    <Layout>
      <span>Public</span>
    </Layout>
  )
}

export default Page

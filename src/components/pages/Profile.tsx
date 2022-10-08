import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import Layout from '@components/layouts/Layout'

const Page: React.FC = () => {
  const { user } = useAuth0()
  return (
    <Layout>
      <ul className="list-disc list-inside text-white">
        <li>Name: {user.name}</li>
        <li>Email: {user.email}</li>
        <li>Nickname: {user.nickname}</li>
      </ul>
    </Layout>
  )
}

export default Page

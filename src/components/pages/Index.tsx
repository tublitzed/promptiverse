import React from 'react'
import Layout from '@components/layouts/Layout'
import PromptGenerator from '@components/PromptGenerator'

const Page: React.FC<{}> = () => {
  return (
    <Layout>
      <PromptGenerator />
    </Layout>
  )
}

export default Page

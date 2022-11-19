import React from 'react'
import Layout from '@components/layouts/Layout'

const Page = () => {
  return (
    <Layout
      windowTitle="About"
      pageTitle="About"
    >
      <p>Credits</p>
      <p>Powered by the <a href="https://github.com/Stability-AI/stability-sdk">Stability-AI SDK</a></p>
    </Layout>
  )
}

export default Page

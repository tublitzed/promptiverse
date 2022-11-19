import React from 'react'
import Layout from '@components/layouts/Layout'
import ImageList from '@components/images/ImageList'

const Page = () => {
  return (
    <Layout pageTitle="Images" windowTitle="Images">
      <ImageList />
    </Layout>
  )
}

export default Page

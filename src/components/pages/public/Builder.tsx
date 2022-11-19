import React from 'react'
import Layout from '@components/layouts/Layout'
import PromptComponent from '@components/Prompt'
const Page = () => {
  return (
    <div>
      <p className="text-gray-500 py-2">Build your own images by typing a simple prompt here:</p>
      <PromptComponent />
    </div>
  )
}

export default Page

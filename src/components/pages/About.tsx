import React from 'react'
import Layout from '@components/layouts/Layout'

const Page = () => {
  const headerClass = 'font-medium text-gray-900 mt-4'
  const textBlockClass = 'text-gray-600 text-sm'
  return (
    <Layout
      windowTitle="About"
      pageTitle="About"
    >
      <div className="container max-w-lg mx-auto">
        <div className="flex justify-center my-12">
          <img
            src={'/static/img/typing_cat_in_sunglasses_trending_on_as.png'}
            alt="The best avatar around"
            title="Typing cat in sunglasses, trending on artstation"
            // TODO: just downsize the image.
            className="rounded-full ring-4 ring-offset-2 ring-red-100 border-red-700 border-4 w-[200px]"
          />
        </div>
        <p className="text-gray-800 text-lg font-light">
        Our mission is to explore what's possible in the world of generative art. We aim to empower others to do the same, by acting as a translation layer between ideas and images.
        </p>

        <h3 className={headerClass}>Credits</h3>
        <p className={textBlockClass}>Powered by the <a href="https://github.com/Stability-AI/stability-sdk" className="underline hover:no-underline" target="_blank">Stability SDK</a>, without which none of this would be possible.</p>
      </div>
    </Layout>
  )
}

export default Page

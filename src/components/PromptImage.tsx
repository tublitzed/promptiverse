import React from 'react'
import Loader from '@components/base/Loader'
import AppContext from '@src/appContext'

const PromptImage = () => {
  const { prompt } = React.useContext(AppContext)
  if (!prompt || !prompt.imgUrl) {
    return null
  }

  if (prompt.loading) {
    return (
      <div className="mt-6 text-center">
        <Loader />
      </div>
    )
  }
  return (
    <div className="p-6 bg-white rounded mt-6">
      <img
        src={prompt?.imgUrl}
        title={prompt?.prompt}
        alt={`Image for prompt ${prompt?.prompt ? prompt.prompt : ''}`}
        width={512}
        height={512}
        className="border m-auto rounded shadow p-2 bg-slate-400"
      />
    </div>
  )
}

export default PromptImage

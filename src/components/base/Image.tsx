import React from 'react'
import AppContext from '@src/appContext'

const Image = () => {
  const { prompt } = React.useContext(AppContext)
  if (!prompt || !prompt.url) {
    return null
  }
  return (
    <div className="p-6 bg-white rounded mt-6">
      <img
        src={prompt?.url}
        title={prompt?.value}
        alt={`Image for prompt ${prompt?.value ? prompt.value : ''}`}
        width={512}
        height={512}
        className="border m-auto rounded shadow p-2 bg-slate-400"
      />
    </div>
  )
}

export default Image

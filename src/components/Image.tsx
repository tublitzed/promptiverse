import React from 'react'
import clsx from 'clsx'
import AppContext from 'components/appContext'

const Image = () => {
  const { user, image, prompt } = React.useContext(AppContext)
  if (!image || !image.url) {
    return null
  }
  return (
    <div className="p-6 bg-white rounded mt-6">
      <img
        src={image?.url}
        title={prompt?.prompt}
        alt={`Image for prompt ${prompt?.prompt ? prompt.prompt : ''}`}
        width={512}
        height={512}
        className="border m-auto rounded shadow p-2 bg-slate-400"
      />
    </div>
  )
}

export default Image

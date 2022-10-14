import React from 'react'
import Loader from '@components/base/Loader'
import AppContext from '@src/appContext'

const Image = () => {
  const { prompt } = React.useContext(AppContext)
  if (!prompt) {
    return null
  }

  if (prompt.loading) {
    return (
      <div className="mt-4 text-center">
        <Loader />
        <h2 className="text-slate-50 font-thin text-lg mt-4">Loading...</h2>
      </div>
    )
  }
  return (
    <div className="p-6 bg-white rounded mt-6">
      <img
        src={prompt?.imgUrl}
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

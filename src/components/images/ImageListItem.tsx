import React from 'react'
import { Prompt } from '@types'

const ImageListItem = ({
  imgUrl,
  prompt,
}:Prompt) => {
  return (
    <div>
      <img
        src={imgUrl}
        title={prompt}
        alt={prompt}
      />
    </div>
  )
}

export default ImageListItem

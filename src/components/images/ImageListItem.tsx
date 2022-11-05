import React from 'react'
import { Prompt } from '@types'

interface ImageListItemProps extends Prompt {
  className?: string
}
const ImageListItem = ({
  imgUrl,
  prompt,
  className,
}:ImageListItemProps) => {
  return (
    <div className={className}>
      <img
        src={imgUrl}
        title={prompt}
        alt={prompt}
      />
    </div>
  )
}

export default ImageListItem

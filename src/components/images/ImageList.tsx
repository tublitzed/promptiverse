import React from 'react'
import Loader from '@components/base/Loader'
import AppContext from '@src/appContext'
import ApiService from '@api/api'
import { PromptApiResponse } from '@types'
import ImageListItem from './ImageListItem'

const ImageList = () => {
  const { user } = React.useContext(AppContext)
  const [images, setImages] = React.useState<PromptApiResponse[]>()

  React.useEffect(() => {
    const loadImages = async () => {
      // Images are really just prompt objects.
      const resp = await ApiService.getImages(user.access_token)

      if (!resp?.prompts) {
        console.log('TODO: errors')
        return
      }
      setImages(resp.prompts)
    }
    if (user.access_token) {
      loadImages()
    }
  }, [user])
  return (
    <div className="p-6 bg-white rounded mt-6">
      {images
        ? <div className="grid grid-cols-2 md:grid-cols-4">{
            images.map(img =>
              <ImageListItem
                {...img}
                key={`imageListItem_${img.id}`}
              />)}
          </div>
        : <Loader />}
    </div>
  )
}

export default ImageList

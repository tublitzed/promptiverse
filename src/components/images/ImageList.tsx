import React from 'react'
import Loader from '@components/base/Loader'
import AppContext from '@src/appContext'
import ApiService from '@api/api'
import { PromptApiResponse } from '@types'
import ImageListItem from './ImageListItem'
import { useLocation, useHistory } from 'react-router-dom'

const ImageList = () => {
  const { user } = React.useContext(AppContext)
  const [images, setImages] = React.useState<PromptApiResponse[]>()
  const routerHistory = useHistory()

  const goToPage = (path:string) => {
    routerHistory.push(path)
  }
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

  if (images && images.length === 0) {
    return (
      <div>
        You have not generated any images yet. <a onClick={() => goToPage('/builder')} className="underline hover:no-underline">Go to the builder</a> to make some.
      </div>
    )
  }
  return (
    <>
      {images
        ? <div className="grid grid-cols-2 md:grid-cols-4">{
            images.map(img =>
              <ImageListItem
                {...img}
                key={`imageListItem_${img.id}`}
              />)}
          </div>
        : <Loader text="Loading images..." />}
    </>
  )
}

export default ImageList

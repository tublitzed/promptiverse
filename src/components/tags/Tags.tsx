import React from 'react'
import Select from '@components/base/Select'
import Api from '@api/api'
import AppContext from '@src/appContext'
import LocalStorage from '@utils/localStorage'
import { compareAsc } from 'date-fns'

import { Tag, TagCategory, TagCollection } from '@types'

export const getSelectedTagIds = (tagCollections: TagCollection[]):string[] => {
  if (!tagCollections.length) {
    return []
  }
  return tagCollections.flatMap(collection => (collection.selectedTags.map(tag => tag.id)))
}

interface SelectOption {
  value: string
  label: string
}

const tagsToSelectOptions = (tags: Tag[]):SelectOption[] => {
  return tags.map((tag:Tag) => ({
    value: tag.id,
    label: tag.label,
  }))
}

const Tags = ({}) => {
  const { user, setTags, tags, isLoading } = React.useContext(AppContext)
  const [error, setError] = React.useState<string | undefined>()


  const onChange = (changedTags: SelectOption[], category: TagCategory) => {
    const newTags:TagCollection[] = tags.map(tagCollection => {
      if (tagCollection.category.id === category.id) {
        // map back from SelectOption format to Tag
        const changedMappedToTag = changedTags.map(tag => ({
          id: tag.value,
          label: tag.label,
          tagCategory: tagCollection.category.id,
        }))
        return {
          ...tagCollection,
          selectedTags: changedMappedToTag,
        }
      }
      return tagCollection
    })

    setTags(newTags)
    LocalStorage.setTags(newTags)
  }

  const loadTags = async () => {
    const resp = await Api.getTags(user?.access_token)
    if (!resp.tags || !resp.categories) {
      setError('Unable to load tags')
      return
    }
    const tagCollections:TagCollection[] = []
    resp.categories.forEach((category: TagCategory) => {
      const selectedTags = tags?.find(tag => tag.category.id === category.id)?.selectedTags ?? []
      tagCollections.push({
        category,
        allTags: resp.tags.filter(tag => tag.tagCategory === category.id),
        selectedTags,
      })
    })
    setTags(tagCollections)
    LocalStorage.setTags(tagCollections, resp.latestTagUpdatedAt)
  }

  // Look at local storage, compare with timestamp from latest tag.
  // Will default to forcing a refresh if unable to compare.
  const refreshTagsIfNeeded = async () => {
    const lastTimeUpdatedClient = LocalStorage.getItem('latestTagUpdatedAt')
    if (!lastTimeUpdatedClient) {
      return loadTags()
    }
    const resp = await Api.getCacheInfo(user?.access_token)
    if (resp.status !== 'ok' || !resp.data?.latest_tag_updated_at) {
      // bail if we have nothing to compare to.
      return loadTags()
    }

    const isClientBehindServer = compareAsc(new Date(resp.data.latest_tag_updated_at), new Date(lastTimeUpdatedClient)) === 1
    if (!isClientBehindServer) {
      return
    }
    loadTags()
  }

  React.useEffect(() => {
    if (isLoading) {
      return
    }
    if (!tags) {
      loadTags()
    } else {
      refreshTagsIfNeeded()
    }
  }, [isLoading])

  if (error) {
    return <div>{error}</div>
  } else if (!tags || !Array.isArray(tags)) {
    return null
  }

  return (
    <>
      {tags.map((tagCollection: TagCollection) => {
        return (
          <div
            key={`tagCategory_${tagCollection.category.id}`}
            className="mt-4">
            <Select
              defaultValue={tagsToSelectOptions(tagCollection.selectedTags)}
              isMulti
              options={tagsToSelectOptions(tagCollection.allTags)}
              placeholder={`Add ${tagCollection.category.label.toLowerCase()}`}
              onChange={(selectedValues:SelectOption[]) => {
                onChange(selectedValues, tagCollection.category)
              }}
            />
          </div>
        )
      })}
    </>
  )
}

export default Tags

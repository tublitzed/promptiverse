import React from 'react'
import Api from '@api/api'
import AppContext from '@src/appContext'
import LocalStorage from '@utils/localStorage'
import Select, { SelectArgs } from '@components/base/Select'
import { compareAsc } from 'date-fns'

import { Tag, TagCategory, TagCollection } from '@types'

export const getSelectedTagIds = (tagCollections: TagCollection[]):string[] => {
  if (!tagCollections.length) {
    return []
  }
  return tagCollections.flatMap(collection => (collection.selectedTagIds))
}

const tagsToSelectOptions = (tags: Tag[]):SelectArgs['options'] => {
  return tags.map((tag:Tag) => ({
    value: tag.id,
    label: tag.label,
  }))
}

const Tags = ({}) => {
  const { user, setTags, tags, isLoading } = React.useContext(AppContext)
  const [error, setError] = React.useState<string | undefined>()


  const onChange = (selectedTagIds: string[], category: TagCategory) => {
    const newTags:TagCollection[] = tags.map(tagCollection => {
      if (tagCollection.category.id !== category.id) {
        return tagCollection
      }
      return {
        ...tagCollection,
        selectedTagIds,
      }
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
      const selectedTagIds = tags?.find(tag => tag.category.id === category.id)?.selectedTagIds ?? []
      tagCollections.push({
        category,
        allTags: resp.tags.filter(tag => tag.tagCategory === category.id),
        selectedTagIds,
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
    <div className="grid gap-y-2">
      {tags.map((tagCollection: TagCollection) => {
        return (
          <div
            key={`tagCategory_${tagCollection.category.id}`}
            className="text-slate-600 text-sm">
            <Select
              defaultValue={tagCollection.selectedTagIds}
              placeholder={`Add ${tagCollection.category.label.toLowerCase()}...`}
              options={tagsToSelectOptions(tagCollection.allTags)}
              onChange={(selectedIds: string[]) => {
                onChange(selectedIds, tagCollection.category)
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

export default Tags

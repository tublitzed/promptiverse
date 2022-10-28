import React from 'react'
import Select from 'react-select'
import Api from '@api/api'
import AppContext from '@src/appContext'

import { Tag, TagCategory, TagCollection } from '@types'

const selectStyles = {
  // https://react-select.com/styles#style-object
  // option: (provided:any, state:any) => {
  //   console.log(provided, state)
  //   return provided
  // },
  control: (provided:any, state:any) => {
    return {
      ...provided,
      // backgroundColor: state.isFocused ? '#FFF' : 'rgb(229 231 235 / var(--tw-bg-opacity))',
    }
  },
}

const customSelectTheme = (provided:any) => {
  // console.log(provided)
  return {
    ...provided,
    colors: {
      ...provided.colors,
      // primary: '#3b82f6',
      // primary25: '#dbeafe',
      // primary50: '#93c5fd',
      // primary75: '#60a5fa',
    },
  }
}

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
  const { user, setTags, tags } = React.useContext(AppContext)
  const [error, setError] = React.useState<string | undefined>()


  const onChange = (changedTags: SelectOption[], category: TagCategory) => {
    const newTags:TagCollection[] = tags.map(tagCollection => {
      if (tagCollection.category.id === category.id) {
        return {
          ...tagCollection,

          // map back from SelectOption format to Tag
          selectedTags: changedTags.map(tag => ({
            id: tag.value,
            label: tag.label,
            tag_category: tagCollection.category.id,
          })),
        }
      }
      return tagCollection
    })
    setTags(newTags)
  }

  const loadTags = async () => {
    const resp = await Api.getTags(user.access_token)
    if (!resp.tags || !resp.categories) {
      setError('Unable to load tags')
      return
    }

    const tagCollections:TagCollection[] = []
    resp.categories.forEach((category: TagCategory) => {
      const selectedTags = tags && tags.length ? tags[category.id]?.selectedTags : []
      tagCollections.push({
        category,
        allTags: resp.tags.filter(tag => tag.tag_category === category.id),
        selectedTags,
      })
    })
    setTags(tagCollections)
  }

  React.useEffect(() => {
    if (user.access_token && !tags) {
      loadTags()
    }
  }, [user.access_token])

  if (error) {
    return <div>{error}</div>
  }
  if (!tags) {
    return null
  }
  return (
    <>
      {tags.map((tagCollection: TagCollection) => {
        return (
          <div
            key={`tagCategory_${tagCollection.category.id}`}
            className="mt-4 text-slate-600 text-sm">
            <Select
              defaultValue={tagsToSelectOptions(tagCollection.selectedTags)}
              placeholder={`Add ${tagCollection.category.label.toLowerCase()}`}
              options={tagsToSelectOptions(tagCollection.allTags)}
              styles={selectStyles}
              theme={customSelectTheme}
              isMulti
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

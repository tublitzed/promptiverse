import React from 'react'
import Select, { MultiValue } from 'react-select'
import Api from '@api/api'
import Button from '@components/base/Button'
import AppContext from '@src/appContext'
import Input from '@components/base/Input'
import Image from '@components/Image'
import LocalStorage from '@utils/localStorage'

import { Tag, Tag_Category } from '@types'

interface TagProps {
  onChange: (tags:Tag[], categoryId: Tag_Category['id']) => void
}
const Tags = ({
  onChange,
}:TagProps) => {
  const { setPrompt, prompt, user } = React.useContext(AppContext)
  const [tags, setTags] = React.useState<Tag[] | undefined>()
  const [categories, setCategories] = React.useState<Tag_Category[] | undefined>()
  const [error, setError] = React.useState<string | undefined>()
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

  const getTags = async () => {
    const resp = await Api.getTags(user.access_token)
    if (!resp.tags || !resp.categories) {
      setError('Unable to load tags')
      return
    }

    setTags(resp.tags)
    setCategories(resp.categories)
  }

  React.useEffect(() => {
    if (user.access_token && !tags) {
      getTags()
    }
  }, [user.access_token])

  if (error) {
    return <div>{error}</div>
  }
  if (!tags || !categories) {
    return null
  }
  return (
    <>
      {categories.map((category: Tag_Category) => {
        const tagsForCategory =
          tags
            .filter((tag: Tag) => tag.tag_category === category.id)
            .map((tag: Tag) => ({
              value: tag.id,
              label: tag.label,
            }))
        return (
          <div
            key={`tagCategory_${category.id}`}
            className="mt-4 text-slate-600 text-sm">
            <Select
              placeholder={`Add ${category.label.toLowerCase()}`}
              options={tagsForCategory}
              styles={selectStyles}
              theme={customSelectTheme}
              isMulti
              onChange={(selectedValues:MultiValue<{}>) => {
                onChange(selectedValues as Tag[], category.id)
              }}
            />
          </div>
        )
      })}
    </>
  )
}

export default Tags

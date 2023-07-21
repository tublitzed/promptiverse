import React from 'react'

// https://react-select.com/typescript#select-generics
import { default as ReactSelect, GroupBase, Options } from 'react-select'

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

export interface Option {
  value: string
  label: string
}

interface SelectProps {
  defaultValue?: Option[]
  isMulti?: boolean
  onChange?: (selected: Options<Option>) => void
  options: Options<Option>
  placeholder?: string
}

const Select = ({
  defaultValue,
  isMulti= false,
  onChange,
  options,
  placeholder,
}:SelectProps) => {
  return (
    <div className="text-slate-600 text-sm">
      <ReactSelect
        defaultValue={defaultValue}
        isMulti={isMulti}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        styles={selectStyles}
        theme={customSelectTheme}
      />
    </div>
  )
}

export default Select

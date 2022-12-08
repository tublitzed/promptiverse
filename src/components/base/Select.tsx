import React from 'react'
import { Select, SelectProps } from 'antd'

export interface SelectArgs extends SelectProps {
  selectedValues?: string[]
  onChange?: (selectedValues:string[]) => void
  options: SelectProps['options']
}

const SelectComponent = ({
  selectedValues,
  onChange,
  placeholder,
  options,
  ...otherProps
}:SelectArgs) => {
  return (
    <Select
      style={{ width: '100%' }}
      showArrow
      defaultValue={selectedValues}
      options={options}
      mode="multiple"
      onChange={onChange}
      {...otherProps}
    />
  )
}

export default SelectComponent

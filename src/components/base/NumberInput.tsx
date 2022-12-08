import React from 'react'
import clsx from 'clsx'
import { InputNumber, InputNumberProps } from 'antd'

export interface Props extends InputNumberProps {
}

const NumberInput = ({
  className,
  ...otherProps
}:Props) => {
  return (
    <div className={className}>
      <InputNumber {...otherProps} />
    </div>
  )
}

export default NumberInput


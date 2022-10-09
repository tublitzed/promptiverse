import React from 'react'
import clsx from 'clsx'

export interface Props extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange'> {
  className?: string;
  onChange?: (value?: any) => void;
  type?: 'string' | 'number';
  valueViaProps?: any;
}

const Input = ({
  className,
  type,
  value: valueViaProps,
  autoFocus,
  onChange,
  ...otherProps
}:Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [value, setValue] = React.useState<any>(valueViaProps)
  React.useEffect(() => {
    if (autoFocus && inputRef?.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])
  return (
    <input
      value={value}
      ref={inputRef}
      type={type || 'string'}
      onChange={(e:any) => {
        setValue(e.target.value)
        if (onChange) {
          onChange(e.target.value)
        }
      }}
      className={clsx(
        className,
        'cursor:pointer p-2 rounded-sm bg-gray-200 text-gray-700',
        'focus:bg-white focus:outline-none focus:ring focus:ring-blue-200',
      )}
      {...otherProps}
    />
  )
}

export default Input


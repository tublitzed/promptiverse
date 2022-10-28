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
  disabled,
  ...otherProps
}:Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [value, setValue] = React.useState<any>(valueViaProps || '')
  React.useEffect(() => {
    if (autoFocus && inputRef?.current) {
      inputRef.current.focus()
    }

    if (valueViaProps !== value) {
      setValue(valueViaProps || '')
    }
  }, [
    autoFocus,
    valueViaProps,
  ])
  return (
    <input
      value={value}
      ref={inputRef}
      disabled={disabled}
      type={type || 'string'}
      onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        if (onChange) {
          onChange(e.target.value)
        }
      }}
      className={clsx(
        className,
        'p-2 rounded-sm',
        disabled ? 'bg-gray-300 text-gray-500' : 'bg-gray-200 text-gray-700 cursor:pointer',
        'focus:bg-white focus:outline-none focus:ring focus:ring-blue-200',
      )}
      {...otherProps}
    />
  )
}

export default Input


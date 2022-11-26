import React from 'react'
import clsx from 'clsx'

export interface Props extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange'> {
  className?: string;
  onChange?: (value?: any) => void;
  type?: 'string' | 'number';
  valueViaProps?: any;
  error?: string;
}

const Input = ({
  className,
  type,
  value: valueViaProps,
  autoFocus,
  onChange,
  disabled,
  error,
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
    <div className={className}>
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
          'p-2 rounded-sm w-full',
          disabled ? 'bg-gray-300 text-gray-500' : 'text-gray-700 cursor:pointer',
          'focus:bg-white focus:outline-none focus:ring focus:ring-blue-200',
          error && 'bg-red-50 border-red-500 border',
          !disabled && !error && 'bg-gray-200',
        )}
        {...otherProps}
      />
      {error && <div className="text-red-500 font-semibold mt-1">{error}</div>}
    </div>
  )
}

export default Input


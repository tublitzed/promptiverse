import React from 'react'
import clsx from 'clsx'

export interface Props extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange'> {
  className?: string;
  isUncontrolledComponent?: boolean;
  onChange?: (value?: string) => void;
  type?: 'string' | 'number';
  value?: any;
}

const Input = ({
  className,
  isUncontrolledComponent,
  type,
  value,
  autoFocus,
  onChange,
  ...otherProps
}:Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  React.useEffect(() => {
    if (autoFocus && inputRef?.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])
  return (
    <input
      ref={inputRef}
      type={type || 'string'}
      onChange={(e:any) => onChange && onChange(e.target.value)}
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


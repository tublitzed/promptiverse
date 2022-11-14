import React from 'react'
import clsx from 'clsx'

type Props = {
  children: any;
  className?: string;
  disabled?: boolean;
  download?: string;
  href?: string;
  onClick?: () => void;
  style?: 'primary' | 'secondary';
  size?: 'med' | 'lg'
  variant?: 'unfilled' | 'filled';
};

const Button = ({
  children,
  download,
  href,
  onClick,
  disabled,
  className,
  style = 'primary',
  variant = 'filled',
  size = 'med',
}: Props): JSX.Element => {
  const cssClasses = clsx(
    className,
    variant === 'filled' && style === 'primary'
      ? 'text-white bg-red-500 ring ring-offset-2 ring-transparent hover:ring-red-400 hover:bg-red-600 focus:ring-red-600 focus:bg-red-700'
      : '',
    variant === 'unfilled' && style === 'primary'
      ? 'text-red-600 hover:text-red-700 ring-offset-2 hover:ring hover:ring-red-700 focus:ring-red-800 focus:text-red-800'
      : '',
    'font-medium rounded-lg',
    size === 'med' ? 'py-2 px-6' : '',
    size === 'lg' ? 'text-lg py-2 px-10' : '',
  )

  if (href) {
    return (
      <a onClick={onClick} className={`${cssClasses} inline-block`} href={href} download={download}>
        {children}
      </a>
    )
  }
  return (
    <button onClick={onClick} className={cssClasses} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button

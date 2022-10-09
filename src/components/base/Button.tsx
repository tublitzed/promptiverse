import React from 'react'
import clsx from 'clsx'

type Props = {
  children: any;
  className?: string;
  color?: 'inherit' | 'primary' | 'secondary';
  disabled?: boolean;
  download?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'text' | 'outlined' | 'contained';
};

const Button = ({ children, download, href, onClick, disabled, className }: Props): JSX.Element => {
  const cssClasses = clsx(
    className,
    'py-2 px-6 border no-underline border-transparent text-sm font-medium rounded-md text-white',
    disabled
      ? 'bg-slate-500'
      : 'bg-slate-700 hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500',
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

import React from 'react'
import clsx from 'clsx'

interface NoticeProps {
  message: string
  show: boolean
  type?: 'ERROR' | 'WARNING'
  className?:string
}
const Notice = ({
  type = 'ERROR',
  show,
  message,
  className,
}: NoticeProps): JSX.Element => {
  const [isVisible, setIsVisible] = React.useState<boolean>(show)
  const hide = () => {
    setIsVisible(false)
  }
  if (!isVisible) {
    return null
  }

  return (
    <section className={clsx(
      className,
      'w-full text-center py-6 px-2 shadow rounded relative',
      type === 'ERROR' && 'bg-red-50 ring ring-red-200 text-red-600',
      type === 'WARNING' && 'bg-orange-100 ring ring-orange-300 text-orange-600',
    )}>
      <p className="text-lg">{message}</p>
      <a
        href="#"
        onClick={hide}
        title="Close"
        className="no-underline hover:bg-white/20 w-6 h-6 text-center right-0 top-0 absolute rounded-full m-2"
      >
        X
      </a>
    </section>
  )
}

export default Notice

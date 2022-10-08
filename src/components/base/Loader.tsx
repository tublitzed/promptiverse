import React from 'react'
import clsx from 'clsx'

const Loader: React.FC<{}> = ({
}) => {
  return (
    <div
      className={
        clsx(
          'bg-gradient-to-r from-blue-500 to-blue-900 h-[3px] w-full',
          'after:absolute after:h-full after:bg-white after:left-0 after:right-[100%] after:animate-loader',
        )
      }
    ></div>
  )
}

export default Loader

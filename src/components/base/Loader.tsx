import React from 'react'
import clsx from 'clsx'

interface Props {
  bgClassName?: string
}

const Loader = ({ bgClassName = 'bg-white' }:Props): JSX.Element => {
  return (
    <div
      className={
        clsx(
          'bg-gradient-to-r from-slate-300 to-slate-400 h-[3px] w-full',
          `after:absolute after:h-[3px] after:bg-slate-600 after:left-0 after:right-[100%] after:animate-loader`,
        )
      }
    ></div>
  )
}

export default Loader

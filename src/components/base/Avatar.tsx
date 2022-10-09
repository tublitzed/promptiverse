import React, { useContext } from 'react'
import clsx from 'clsx'
import AppContext from '@src/appContext'

const Avatar = () => {
  const { user } = React.useContext(AppContext)
  if (!user) {
    return null
  }
  return (
    <img
      src={user.picture}
      alt={user.username}
      width={150}
      height={150}
      className="h-8 w-8 rounded-full"
    />
  )
}

export default Avatar

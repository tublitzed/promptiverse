import React from 'react'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom'

interface LogoProps {
  className?: string
  iconOnly?: boolean
  linkedToHome?: boolean
}
const Logo = ({
  className,
  iconOnly = false,
  linkedToHome = true,
}:LogoProps): JSX.Element => {
  const routerHistory = useHistory()

  const goToHome = () => {
    routerHistory.push('/')
  }

  const wrapper = (content: React.ReactNode) => {
    if (linkedToHome) {
      return (
        <a onClick={goToHome} className={clsx(className, 'cursor-pointer')}>
          {content}
        </a>
      )
    }
    return <span className={className}>{content}</span>
  }

  return (
    wrapper(<img src={iconOnly ? 'static/img/icon.svg' : 'static/img/logo.svg'} alt="logo" />)
  )
}

export default Logo

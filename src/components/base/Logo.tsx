import React from 'react'
import { useHistory } from 'react-router-dom'

interface LogoProps {
  className?: string
}
const Logo = (props: LogoProps): JSX.Element => {
  const routerHistory = useHistory()

  const goToHome = () => {
    routerHistory.push('/')
  }
  return (
    <a onClick={goToHome} href="#" className={props?.className}>
      <img src="/static/img/logo.svg" alt="logo" />
    </a>
  )
}

export default Logo

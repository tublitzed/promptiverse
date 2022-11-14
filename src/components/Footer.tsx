import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'

const Footer: React.FC = () => {
  const routerHistory = useHistory()
  const linkStyle = 'text-red-400 mx-4 hover:underline'

  const goToPage = (path:string) => {
    routerHistory.push(path)
  }
  return (
    <footer className="bg-red-50 p-6 mt-12 border-t border-red-100">
      <div className="flex container mx-auto justify-center">
        <a
          href=""
          className={linkStyle}
          onClick={() => goToPage('/about')}
        >
        About
        </a>
        <a
          href=""
          className={linkStyle}
          onClick={() => goToPage('/about')}
        >
        About
        </a>
        <a
          href=""
          className={linkStyle}
          onClick={() => goToPage('/about')}
        >
        About
        </a>
        <a
          href=""
          className={linkStyle}
          onClick={() => goToPage('/about')}
        >
        About
        </a>
      </div>
    </footer>
  )
}

export default Footer

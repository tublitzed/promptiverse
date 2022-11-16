import React from 'react'
import Header from '@components/headers/Header'
import PublicHeader from '@components/headers/PublicHeader'
import { useAuth0 } from '@auth0/auth0-react'
import Button from '@components/base/Button'
import Footer from '@components/Footer'
import { useLocation, useHistory } from 'react-router-dom'

const Hero: React.FC = () => {
  const routerHistory = useHistory()
  const linkStyle = 'text-red-400 mx-4 hover:underline'

  const goToPage = (path:string) => {
    routerHistory.push(path)
  }
  return (
    <div className="h-[500px] bg-red-900 px-6">
      <div className="container mx-auto grid sm:grid-cols-3 text-white">
        <div className="col-span-1 mt-24 md:mt-36">
          <h1 className="text-4xl font-bold">The future of generative images starts here</h1>
          <h4 className="text-xl mt-2">Use our builder to explore the magic of AI imagery for free.</h4>
          <Button
            size="lg"
            className="mt-6"
            onClick={() => goToPage('/builder')}
          >Get Started</Button>
        </div>
      </div>
    </div>
  )
}

export default Hero

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
    <div className="h-[500px] bg-gray-900">
      <div className="container mx-auto grid grid-cols-3 text-white">
        <div className="col-span-3 md:col-span-2 lg:col-span-1 mt-20 lg:mt-32 px-8">
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

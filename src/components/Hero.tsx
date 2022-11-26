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

  const style = {
    background: 'url("/static/img/bgs/rolling_waves_trending_on_artstation_ernst.png") no-repeat 0 0',
    backgroundSize: 'cover',
  }

  return (
    <div className="h-[500px] bg-gray-900 flex" style={style}>
      <div className="flex container mx-auto justify-center self-center">
        <div className="text-white p-8 rounded mx-4 bg-[#3b4657a1]">
          <h1 className="text-4xl font-bold">The future of generative images starts here</h1>
          <h4 className="text-xl mt-2">Try our image builder to explore the magic of AI imagery for free</h4>
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

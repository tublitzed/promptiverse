import React from 'react'
import Header from 'components/Header'
import AppContext from 'components/appContext'

export interface Props {
  children: React.ReactNode
}

const App = ({ children }:Props): JSX.Element => {
  const { user, isLoading } = React.useContext(AppContext)
  return (
    <main className="bg-slate-600 w-full min-h-screen">
      <Header />
      <div className="container mx-auto h-full">
        <div className="py-6 px-8">
          {isLoading ? <>Loading</> : children}
        </div>
      </div>
    </main>
  )
}

export default App

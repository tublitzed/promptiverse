import React from 'react'

export interface Props {
  children?: React.ReactNode
  errorMessage?: string
}

const ErrorLayout = ({ children, errorMessage }:Props): JSX.Element => {
  return (
    <main className="bg-slate-600 w-full min-h-screen">
      <div className="container mx-auto h-full">
        <div className="mx-auto text-center p-12 text-white">
          {children
            ? children :
              <div className="text-center py-24 text-xl font-thin">{errorMessage ? errorMessage : 'Unknown Error'}</div>
          }
        </div>
      </div>
    </main>
  )
}

export default ErrorLayout

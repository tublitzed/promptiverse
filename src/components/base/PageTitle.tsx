import React from 'react'

interface Props {
  title: string, subtitle?: string
}
const PageTitle = ({
  title,
  subtitle,
}:Props) => {
  return (
    <div className="pt-4 pb-2 border-b">
      <h2 className="text-xl text-gray-700">{title}</h2>
      {subtitle && <h3 className="text-lg text-gray-500">{subtitle}</h3>}
    </div>
  )
}

export default PageTitle

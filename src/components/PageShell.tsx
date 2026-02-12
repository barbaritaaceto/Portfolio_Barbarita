import React from 'react'

type Props = {
  children: React.ReactNode
  sidebar?: React.ReactNode
}

const PageShell: React.FC<Props> = ({children, sidebar}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">{children}</div>
      <aside className="md:col-span-1 space-y-6">{sidebar}</aside>
    </div>
  )
}

export default PageShell

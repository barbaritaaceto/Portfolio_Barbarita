import React from 'react'

type Props = { children: React.ReactNode, className?: string }

export default function Card({children, className=''}: Props){
  return (
    <div className={`bg-white rounded-2xl border p-6 shadow-sm ${className}`} style={{borderColor: 'var(--card-border)'}}>
      {children}
    </div>
  )
}

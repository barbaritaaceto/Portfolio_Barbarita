import React from 'react'

type BadgeProps = {
  children: React.ReactNode
  variant?: 'primary' | 'highlight'
}

export default function Badge({children, variant = 'primary'}: BadgeProps){
  const styles = variant === 'highlight'
    ? { backgroundColor: 'rgba(63,42,134,0.08)', color: '#3F2A86' }
    : { backgroundColor: '#E7F3F2', color: '#2F7F78' }

  return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs" style={styles}>{children}</span>
}

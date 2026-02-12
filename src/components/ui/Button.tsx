import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' }

export default function Button({variant='primary', className='', ...props}: Props){
  const base = 'px-4 py-2 rounded-xl font-medium '
  const v = variant === 'primary' ? 'bg-primary text-white' : 'bg-white border'
  return <button className={`${base} ${v} ${className}`} {...props} />
}

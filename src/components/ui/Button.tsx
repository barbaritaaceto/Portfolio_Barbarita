import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' }

export default function Button({variant='primary', className='', style, ...props}: Props){
  const base = 'px-4 py-2 rounded-full font-medium transition ease-in-out duration-150 '
  if(variant === 'primary'){
    return <button style={{backgroundColor: 'var(--primary)', ...(style as any)}} className={`${base} text-white hover:brightness-95 ${className}`} {...props} />
  }
  return <button style={{borderColor: 'var(--primary)', ...(style as any)}} className={`${base} bg-white border text-[var(--primary)] hover:bg-[rgba(228,107,140,0.04)] ${className}`} {...props} />
}

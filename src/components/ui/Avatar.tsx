import React from 'react'

export default function Avatar({src, alt}:{src?:string, alt?:string}){
  return <img src={src||'/placeholder.png'} alt={alt||'avatar'} className="w-20 h-20 rounded-xl object-cover" />
}

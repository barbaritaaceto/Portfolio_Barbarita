import React from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/notes', label: 'Notes' },
  { to: '/press', label: 'Press' }
]

export default function Navbar(){
  return (
    <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="text-xl font-semibold">Barbara Aceto</div>
      </div>
      <div className="hidden md:flex items-center gap-4 text-sm text-gray-700">
        {links.map(l=> (
          <NavLink key={l.to} to={l.to} className={({isActive})=> isActive? 'text-primary font-medium':'hover:text-primary'}>{l.label}</NavLink>
        ))}
      </div>
    </nav>
  )
}

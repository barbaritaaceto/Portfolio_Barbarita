import React from 'react'
import Card from './ui/Card'
import Avatar from './ui/Avatar'
import Button from './ui/Button'
import { Link } from 'react-router-dom'

export default function ProfileCard(){
  return (
    <div className="relative z-20 -mt-10 md:-mt-14 flex justify-center">
      <Card className="w-full max-w-2xl text-center p-6 md:p-8">
        <div className="flex flex-col items-center gap-4">
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4" style={{borderColor:'var(--bg)'}}>
            <img src="/avatar.jpg" alt="Barbara" className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">Barbara Aceto <span className="text-[var(--primary)] text-sm">✓</span></h3>
            <div className="text-sm text-gray-600">Builder of things that matter</div>
            <div className="text-xs text-gray-500 mt-1">Buenos Aires, Argentina</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center mt-2">
            <Link to="/projects"><Button className="rounded-full px-5 py-2 bg-[var(--primary)] text-white hover:brightness-95">View Projects</Button></Link>
            <a href="mailto:hello@placeholder.com"><Button variant="ghost" className="rounded-full px-5 py-2 border-[var(--card-border)]" style={{borderColor:'var(--primary)'}}>Get in touch</Button></a>
            <a href="/one-sheet?pdf=1" target="_blank" rel="noopener noreferrer" className="self-center text-sm text-gray-600 underline">Download CV</a>
          </div>
        </div>
      </Card>
    </div>
  )
}

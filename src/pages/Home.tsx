import React from 'react'
import { Helmet } from 'react-helmet-async'
import Hero from '../components/Hero'
import ProfileCard from '../components/ProfileCard'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import Hero from '../components/Hero'
import ProfileCard from '../components/ProfileCard'
import Card from '../components/ui/Card'
import projects from '../data/projects'
import notes from '../data/notes'
import Sidebar from '../components/Sidebar'
import ProjectCard from '../components/ProjectCard'
import NoteCard from '../components/NoteCard'
import PressCard from '../components/PressCard'
import { Link } from 'react-router-dom'

export default function Home(){
  const featured = projects.filter(p=> p.featured).slice(0,4)
  const latest = notes.slice(0,3)
  const press = [] // keep simple; can reuse data if needed

  return (
    <>
      <Helmet>
        <title>Barbara Aceto — Home</title>
      </Helmet>

      <Hero />

      <div className="container mx-auto px-4 mt-6">
        <ProfileCard />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <main>
            <section className="mb-6">
              <Card>
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold">About</h3>
                  <img src="/hummingbird.png" alt="" className="w-5 h-5 opacity-60" />
                </div>
                <p className="text-sm text-gray-600 mt-3">I build digital products at the intersection of strategy, technology and applied AI — with a focus on clarity, measurable impact and human-centered experiences.</p>
                <div className="mt-3"><Link to="/about" className="text-[var(--primary)]">Read more →</Link></div>
              </Card>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Selected Work</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featured.map(p=> <ProjectCard key={p.slug} project={p} />)}
              </div>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Notes</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  {latest[0] && <NoteCard note={latest[0]} />}
                </div>
                <div className="space-y-4">
                  {latest.slice(1).map(n=> <NoteCard key={n.slug} note={n} />)}
                </div>
              </div>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold mb-3">In the Press</h3>
              <div className="space-y-3">
                {press.length === 0 && <Card><div className="text-sm text-gray-600">Press items will appear here.</div></Card>}
              </div>
            </section>
          </main>

          <aside>
            <Sidebar />
          </aside>
        </div>
      </div>
    </>
  )
}

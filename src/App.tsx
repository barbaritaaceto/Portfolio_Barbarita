import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './routes/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Notes from './pages/Notes'
import NoteDetail from './pages/NoteDetail'
import Press from './pages/Press'
import OneSheet from './pages/OneSheet'
import NewsLinks from './pages/NewsLinks'
import NotFound from './pages/NotFound'

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="projects" >
          <Route index element={<Projects />} />
          <Route path=":slug" element={<ProjectDetail />} />
        </Route>
        <Route path="notes" >
          <Route index element={<Notes />} />
          <Route path=":slug" element={<NoteDetail />} />
        </Route>
        <Route path="press" element={<Press />} />
        <Route path="one-sheet" element={<OneSheet />} />
        <Route path="news-links" element={<NewsLinks />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

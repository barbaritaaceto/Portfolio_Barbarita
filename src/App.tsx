import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './routes/Layout'
import Home from './pages/Home'

const About       = lazy(() => import('./pages/About'))
const Projects    = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Notes       = lazy(() => import('./pages/Notes'))
const NoteDetail  = lazy(() => import('./pages/NoteDetail'))
const Press       = lazy(() => import('./pages/Press'))
const OneSheet    = lazy(() => import('./pages/OneSheet'))
const NewsLinks   = lazy(() => import('./pages/NewsLinks'))
const NotFound    = lazy(() => import('./pages/NotFound'))

function PageLoader() {
  return (
    <div className="w-full flex justify-center py-24">
      <div style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid var(--border-base)', borderTopColor: 'var(--accent-primary)', animation: 'spin 0.7s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<Suspense fallback={<PageLoader />}><About /></Suspense>} />
        <Route path="projects">
          <Route index element={<Suspense fallback={<PageLoader />}><Projects /></Suspense>} />
          <Route path=":slug" element={<Suspense fallback={<PageLoader />}><ProjectDetail /></Suspense>} />
        </Route>
        <Route path="notes">
          <Route index element={<Suspense fallback={<PageLoader />}><Notes /></Suspense>} />
          <Route path=":slug" element={<Suspense fallback={<PageLoader />}><NoteDetail /></Suspense>} />
        </Route>
        <Route path="press"      element={<Suspense fallback={<PageLoader />}><Press /></Suspense>} />
        <Route path="one-sheet"  element={<Suspense fallback={<PageLoader />}><OneSheet /></Suspense>} />
        <Route path="news-links" element={<Suspense fallback={<PageLoader />}><NewsLinks /></Suspense>} />
        <Route path="*"          element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
      </Route>
    </Routes>
  )
}

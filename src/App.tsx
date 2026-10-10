import React, { lazy, Suspense } from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import Layout from './routes/Layout'
import Home from './pages/Home'

const Projects    = lazy(() => import('./pages/Projects'))
const Notes       = lazy(() => import('./pages/Notes'))
const NoteDetail  = lazy(() => import('./pages/NoteDetail'))
const OneSheet    = lazy(() => import('./pages/OneSheet'))
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
        {/* Páginas retiradas: su contenido vive en el Home y en el One Sheet */}
        <Route path="about" element={<Navigate to="/" replace />} />
        <Route path="projects">
          <Route index element={<Suspense fallback={<PageLoader />}><Projects /></Suspense>} />
          <Route path=":slug" element={<Navigate to="/projects" replace />} />
        </Route>
        <Route path="notes">
          <Route index element={<Suspense fallback={<PageLoader />}><Notes /></Suspense>} />
          <Route path=":slug" element={<Suspense fallback={<PageLoader />}><NoteDetail /></Suspense>} />
        </Route>
        <Route path="press"      element={<Navigate to="/" replace />} />
        <Route path="one-sheet"  element={<Suspense fallback={<PageLoader />}><OneSheet /></Suspense>} />
        <Route path="news-links" element={<Navigate to="/" replace />} />
        <Route path="*"          element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
      </Route>
    </Routes>
  )
}

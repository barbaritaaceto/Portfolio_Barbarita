import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import projects from '../data/projects'

export default function ProjectDetail(){
  const { slug } = useParams()
  const project = projects.find(p => p.slug === slug)

  if(!project) return (
    <div className="w-full min-h-screen py-20 px-4" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-serif text-slate-900 mb-4">Project not found</h1>
        <Link to="/projects" style={{ color: 'var(--accent-primary)' }}>← Back to projects</Link>
      </div>
    </div>
  )

  return (
    <>
      <Helmet><title>{project.title} — Barbara Aceto</title></Helmet>
      
      <div className="w-full min-h-screen py-20 px-4" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <Link to="/projects" className="inline-flex items-center text-sm mb-8" style={{ color: 'var(--accent-primary)' }}>
            ← Back to projects
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-semibold text-slate-900 mb-4">
              {project.title}
            </h1>
            {project.duration && (
              <p className="text-sm text-slate-500 mb-4">{project.duration}</p>
            )}
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              {project.description}
            </p>
            
            {/* Tech tags */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: '#E7F3F2', color: '#2F7F78', border: '1px solid #D7ECEA' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Roles */}
          {project.roles && project.roles.length > 0 && (
            <div className="space-y-8 mb-12">
              {project.roles.map((role, index) => (
                <div key={index} className="card">
                  <div className="mb-4">
                    <h2 className="text-2xl font-serif font-semibold text-slate-900 mb-1">
                      {role.title}
                    </h2>
                    <p className="text-sm text-slate-500">{role.period}</p>
                  </div>

                  <div className="mb-4">
                    <ul className="space-y-2">
                      {role.responsibilities.map((resp, i) => (
                        <li key={i} className="text-slate-700 text-sm leading-relaxed flex">
                          <span className="mr-2 flex-shrink-0" style={{ color: 'var(--accent-primary)' }}>•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t" style={{ borderColor: 'var(--border-base)' }}>
                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Focus</p>
                    <p className="text-sm text-slate-700">{role.focus}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Talks & Knowledge Sharing */}
          {project.talks && project.talks.length > 0 && (
            <div className="card">
              <h2 className="text-2xl font-serif font-semibold text-slate-900 mb-4">
                Product Talks & Knowledge Sharing
              </h2>
              <p className="text-sm text-slate-600 mb-4">
                Delivered internal talks and trainings on:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {project.talks.map((talk, i) => (
                  <li key={i} className="text-slate-700 text-sm flex items-start">
                    <span className="mr-2 flex-shrink-0" style={{ color: 'var(--accent-primary)' }}>•</span>
                    <span>{talk}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-slate-600 italic mt-6">
                Positioned as a product voice within the organization, bridging strategy, analytics and delivery.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

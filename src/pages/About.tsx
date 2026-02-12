import React from 'react'
import { Helmet } from 'react-helmet-async'
import PageShell from '../components/PageShell'
import Card from '../components/ui/Card'
import SidebarContact from '../components/SidebarContact'

export default function About(){
  return (
    <>
      <Helmet>
        <title>About — Barbara Aceto</title>
      </Helmet>
      <PageShell sidebar={<SidebarContact />}>
        <Card>
          <h2 className="text-xl font-semibold">About</h2>
          <p className="mt-2 text-gray-600">I lead product and engineering teams to deliver AI-enabled experiences at scale. I focus on strategy, measurable outcomes and human-centered design.</p>
        </Card>

        <Card>
          <h3 className="font-semibold">Experience</h3>
          <div className="mt-3 space-y-4 text-sm text-gray-700">
            <div>
              <div className="font-medium">Head of Product — Example Co</div>
              <div className="text-xs text-gray-500">2022 — Present</div>
              <ul className="mt-1 list-disc ml-5 text-gray-600">
                <li>Built cross-functional AI product teams.</li>
                <li>Delivered platform features used by millions.</li>
              </ul>
            </div>
            <div>
              <div className="font-medium">Product Manager — Another Co</div>
              <div className="text-xs text-gray-500">2018 — 2022</div>
              <ul className="mt-1 list-disc ml-5 text-gray-600">
                <li>Led analytics and experimentation.</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold">Education & Certifications</h3>
          <div className="mt-2 text-sm text-gray-700">MSc / Certificates — placeholder</div>
        </Card>
      </PageShell>
    </>
  )
}

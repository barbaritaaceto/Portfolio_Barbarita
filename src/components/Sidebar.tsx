import React from 'react'
import Card from './ui/Card'

export default function Sidebar(){
  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">Contact</h4>
          <img src="/hummingbird.png" alt="" className="w-5 h-5 opacity-80" />
        </div>
        <div className="text-sm text-gray-600 mt-2">hello@placeholder.com</div>
        <div className="text-sm text-gray-600 mt-1">LinkedIn placeholder</div>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">Skills</h4>
          <span className="text-xs text-gray-500">Grouped</span>
        </div>
        <div className="mt-2 space-y-2 text-sm text-gray-700">
          <div><strong>Product:</strong> Strategy, Discovery, Roadmapping</div>
          <div><strong>AI:</strong> LLMs, Prompt Design, Integration</div>
          <div><strong>Tech:</strong> APIs, Analytics, UX Systems</div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">Highlights</h4>
          <img src="/floral-corner-top-right.png" alt="" className="w-5 h-5 opacity-60" />
        </div>
        <ul className="mt-2 list-disc pl-5 text-sm text-gray-600">
          <li>Led cross-functional product teams.</li>
          <li>Built AI-enabled digital platforms.</li>
          <li>Delivered measurable business impact.</li>
        </ul>
      </Card>
    </div>
  )
}

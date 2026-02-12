import React, { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import pressData from '../data/press'
import PressCard from '../components/PressCard'
import Card from '../components/ui/Card'

export default function Press(){
  const years = useMemo(()=> Array.from(new Set(pressData.map(p=>p.year))).sort((a,b)=>b-a), [])
  const [year, setYear] = useState<number | null>(years[0] || null)

  const filtered = useMemo(()=> pressData.filter(p=> year ? p.year === year : true), [year])

  return (
    <div>
      <Helmet><title>Press — Barbara Aceto</title></Helmet>
      <h1 className="text-2xl font-semibold mb-4">Press</h1>
      <Card>
        <div className="mb-4 flex gap-2">
          {years.map(y=> <button key={y} onClick={()=> setYear(prev=> prev===y? null : y)} className={`px-3 py-1 rounded ${year===y? 'bg-primary text-white':'bg-gray-100'}`}>{y}</button>)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(p=> <PressCard key={p.slug} item={p} />)}
        </div>
      </Card>
    </div>
  )
}

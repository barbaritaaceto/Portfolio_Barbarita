import React from 'react'
import { PressItem } from '../data/types'

export default function PressCard({item, locale = 'en-US'}:{item:PressItem; locale?: string}){
  return (
    <div className="bg-white rounded-2xl border p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <img src={item.image||'/placeholder.png'} alt={item.outlet} className="w-24 h-14 object-cover rounded" />
        <div>
          <div className="text-sm text-gray-500">
            {item.outlet} · {new Date(item.date).toLocaleDateString(locale, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
          <h4 className="font-medium">{item.title}</h4>
        </div>
      </div>
    </div>
  )
}

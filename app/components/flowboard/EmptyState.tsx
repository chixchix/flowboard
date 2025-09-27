import React from 'react'

export default function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 mx-auto mb-4 bg-slate-700 rounded-full flex items-center justify-center">
        <div className="w-8 h-8 bg-slate-600 rounded-full"></div>
      </div>
      <h3 className="text-sm font-medium text-slate-200 mb-1">{title}</h3>
      <p className="text-sm text-slate-400">{description}</p>
    </div>
  )
}

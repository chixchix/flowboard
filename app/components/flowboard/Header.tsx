import React from 'react'

export default function Header() {
  return (
    <header className="bg-slate-900 border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">FlowBoard</h1>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">JD</span>
          </div>
          <button className="text-sm text-slate-300 hover:text-white transition-colors duration-200">
            Sign Out
          </button>
        </div>
      </div>
    </header>
  )
}

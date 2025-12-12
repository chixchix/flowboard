import React from 'react'
import { Download, Upload, Archive } from 'lucide-react'
import type { Task } from './types'

export default function Header({
  tasks,
  onImport,
  onToggleArchived
}: {
  tasks?: Task[]
  onImport?: (tasks: Task[]) => void
  onToggleArchived?: () => void
}) {
  const handleExport = () => {
    if (!tasks) return
    const dataStr = JSON.stringify(tasks, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `flowboard-tasks-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = () => {
    if (!onImport) return
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const importedTasks = JSON.parse(event.target?.result as string)
          if (Array.isArray(importedTasks)) {
            onImport(importedTasks)
          } else {
            alert('Invalid file format')
          }
        } catch (error) {
          alert('Error reading file')
        }
      }
      reader.readAsText(file)
    }
    input.click()
  }

  return (
    <header className="bg-slate-900 border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">FlowBoard</h1>
        <div className="flex items-center gap-3">
          {tasks && (
            <>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors duration-200"
                title="Export tasks"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button
                onClick={handleImport}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors duration-200"
                title="Import tasks"
              >
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Import</span>
              </button>
              {onToggleArchived && (
                <button
                  onClick={onToggleArchived}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors duration-200"
                  title="View archived tasks"
                >
                  <Archive className="w-4 h-4" />
                  <span className="hidden sm:inline">Archive</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  )
}

'use client'
import React, { useState } from 'react'
import { CATEGORIES } from './constants'
import type { Category, Task } from './types'

export default function QuickAddForm({
  onAdd
}: {
  onAdd: (task: Omit<Task, 'id'>) => void
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const [category, setCategory] = useState<Category>('Work')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    onAdd({
      title: title.trim(),
      notes: notes.trim() || undefined,
      category,
      status: 'todo'
    })

    setTitle('')
    setNotes('')
    setIsExpanded(false)
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-xl">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Add a task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            className="flex-1 px-3 py-2 border border-slate-600 bg-slate-700 text-white placeholder-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          <button
            type="submit"
            disabled={!title.trim()}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Add
          </button>
        </div>

        {isExpanded && (
          <div className="mt-3 space-y-3">
            <textarea
              placeholder="Notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-slate-600 bg-slate-700 text-white placeholder-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
            />
            <div className="flex gap-3">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="px-3 py-2 border border-slate-600 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="px-3 py-2 text-slate-400 hover:text-slate-200 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

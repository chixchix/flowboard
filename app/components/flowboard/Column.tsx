'use client'
import React, { useState } from 'react'
import { cx } from './utils'
import EmptyState from './EmptyState'
import TaskCard from './TaskCard'
import type { Task, TaskStatus } from './types'

export default function Column({
  title,
  status,
  tasks,
  onEdit,
  onStatusChange,
  onDrop
}: {
  title: string
  status: TaskStatus
  tasks: Task[]
  onEdit: (task: Task) => void
  onStatusChange: (taskId: string, status: TaskStatus) => void
  onDrop: (taskId: string, newStatus: TaskStatus) => void
}) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    // Only set to false if we're leaving the column entirely
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX
    const y = e.clientY
    
    if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
      setIsDragOver(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const taskId = e.dataTransfer.getData('text/plain')
    if (taskId) {
      onDrop(taskId, status)
    }
  }

  return (
    <div className="flex-1 min-w-80 snap-center" role="region" aria-label={`${title} column`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-slate-300 uppercase tracking-wide">{title}</h2>
        <span className="text-xs text-slate-400 bg-slate-700/60 px-2 py-1 rounded-md font-medium" aria-label={`${tasks.length} tasks`}>
          {tasks.length}
        </span>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="list"
        aria-label={`${title} tasks`}
        className={cx(
          'min-h-96 p-3 rounded-xl transition-all duration-200 border-2',
          isDragOver 
            ? 'bg-blue-500/10 border-blue-400 border-dashed scale-[1.02] shadow-lg shadow-blue-500/20' 
            : 'bg-slate-800/50 border-transparent'
        )}
      >
        <div className="space-y-3">
          {isDragOver && tasks.length === 0 && (
            <div className="flex items-center justify-center h-32 border-2 border-dashed border-blue-400 rounded-lg bg-blue-500/5">
              <p className="text-sm text-blue-300 font-medium">Drop here</p>
            </div>
          )}
          {tasks.length === 0 && !isDragOver ? (
            <EmptyState title="No tasks" description={`No tasks in ${title.toLowerCase()}`} />
          ) : (
            tasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={onEdit}
                onStatusChange={onStatusChange}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

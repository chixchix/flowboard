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
    setIsDragOver(true)
  }

  const handleDragLeave = () => setIsDragOver(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const taskId = e.dataTransfer.getData('text/plain')
    onDrop(taskId, status)
  }

  return (
    <div className="flex-1 min-w-80">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-slate-300">{title}</h2>
        <span className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded-md">
          {tasks.length}
        </span>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cx(
          'min-h-96 p-2 rounded-xl transition-colors duration-200',
          isDragOver ? 'bg-blue-500/10 border-2 border-blue-400 border-dashed' : 'bg-slate-800/50'
        )}
      >
        <div className="space-y-3">
          {tasks.length === 0 ? (
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

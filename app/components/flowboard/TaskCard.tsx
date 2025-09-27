import React from 'react'
import { STATUSES } from './constants'
import { cx, getCategoryColor } from './utils'
import Badge from './Badge'
import type { Task, TaskStatus } from './types'

export default function TaskCard({
  task,
  onEdit,
  onStatusChange
}: {
  task: Task
  onEdit: (task: Task) => void
  onStatusChange: (taskId: string, status: TaskStatus) => void
}) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', task.id)
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={() => onEdit(task)}
      className="bg-slate-800 border border-slate-700 rounded-xl p-3 shadow-lg hover:shadow-xl hover:border-slate-600 transition-all duration-200 cursor-pointer group backdrop-blur-sm"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-medium text-slate-100 line-clamp-2 group-hover:text-blue-400 transition-colors duration-200">
          {task.title}
        </h3>
        <select
          value={task.status}
          onChange={(e) => {
            e.stopPropagation()
            onStatusChange(task.id, e.target.value as TaskStatus)
          }}
          onClick={(e) => e.stopPropagation()}
          className="text-xs px-1 py-0.5 border border-slate-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-700 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          {STATUSES.map(status => (
            <option key={status.key} value={status.key}>{status.label}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between">
        <Badge className={getCategoryColor(task.category)}>
          {task.category}
        </Badge>
        {/* no due date */}
        <div />
      </div>
    </div>
  )
}

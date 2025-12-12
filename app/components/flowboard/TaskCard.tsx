import React from 'react'
import { STATUSES, PRIORITIES } from './constants'
import { cx, getCategoryColor } from './utils'
import Badge from './Badge'
import { Calendar, AlertCircle } from 'lucide-react'
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
  const [isDragging, setIsDragging] = React.useState(false)

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', task.id)
    e.dataTransfer.effectAllowed = 'move'
    setIsDragging(true)
    
    // Create a custom drag image
    const dragImage = e.currentTarget.cloneNode(true) as HTMLElement
    dragImage.style.opacity = '0.5'
    dragImage.style.transform = 'rotate(2deg)'
    document.body.appendChild(dragImage)
    e.dataTransfer.setDragImage(dragImage, 0, 0)
    setTimeout(() => document.body.removeChild(dragImage), 0)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done'
  const isDueSoon = task.dueDate && !isOverdue && new Date(task.dueDate) < new Date(Date.now() + 24 * 60 * 60 * 1000)

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    if (date.toDateString() === today.toDateString()) return 'Today'
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow'
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={() => onEdit(task)}
      role="button"
      tabIndex={0}
      aria-label={`Task: ${task.title}${task.priority ? `, Priority: ${task.priority}` : ''}${task.dueDate ? `, Due: ${formatDueDate(task.dueDate)}` : ''}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onEdit(task)
        }
      }}
      className={cx(
        'bg-slate-800 border rounded-xl p-3 shadow-lg hover:shadow-xl hover:border-slate-600 transition-all duration-200 cursor-pointer group backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500',
        isOverdue ? 'border-red-500/50' : 'border-slate-700',
        isDragging && 'opacity-40 scale-95'
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-medium text-slate-100 line-clamp-2 group-hover:text-blue-400 transition-colors duration-200 flex-1">
          {task.title}
        </h3>
        <select
          value={task.status}
          onChange={(e) => {
            e.stopPropagation()
            onStatusChange(task.id, e.target.value as TaskStatus)
          }}
          onClick={(e) => e.stopPropagation()}
          aria-label="Change task status"
          className="text-xs px-1 py-0.5 border border-slate-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-700 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2"
        >
          {STATUSES.map(status => (
            <option key={status.key} value={status.key}>{status.label}</option>
          ))}
        </select>
      </div>

      {task.notes && (
        <p className="text-xs text-slate-400 mb-2 line-clamp-2">{task.notes}</p>
      )}

      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <Badge className={getCategoryColor(task.category)}>
            {task.category}
          </Badge>
          {task.priority && (
            <Badge className={PRIORITIES.find(p => p.key === task.priority)?.color || 'bg-slate-600 text-slate-200'}>
              {PRIORITIES.find(p => p.key === task.priority)?.label}
            </Badge>
          )}
        </div>
        
        {task.dueDate && (
          <div className={cx(
            'flex items-center gap-1 text-xs px-2 py-0.5 rounded-md',
            isOverdue ? 'bg-red-500/20 text-red-300' : isDueSoon ? 'bg-orange-500/20 text-orange-300' : 'bg-slate-700/50 text-slate-300'
          )}>
            {isOverdue && <AlertCircle className="w-3 h-3" />}
            <Calendar className="w-3 h-3" />
            <span>{formatDueDate(task.dueDate)}</span>
          </div>
        )}
      </div>
    </div>
  )
}

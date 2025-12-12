'use client'
import React, { useMemo } from 'react'
import Column from './Column'
import { STATUSES } from './constants'
import { sortTasks } from './utils'
import type { Task, TaskStatus } from './types'
import type { SortOption } from './FiltersBar'

export default function Board({
  tasks,
  onEdit,
  onStatusChange,
  onDrop,
  sortBy
}: {
  tasks: Task[]
  onEdit: (task: Task) => void
  onStatusChange: (taskId: string, status: TaskStatus) => void
  onDrop: (taskId: string, newStatus: TaskStatus) => void
  sortBy: SortOption
}) {
  const tasksByStatus = useMemo(() => {
    return STATUSES.reduce((acc, status) => {
      const statusTasks = tasks.filter(task => task.status === status.key)
      acc[status.key] = sortTasks(statusTasks, sortBy)
      return acc
    }, {} as Record<TaskStatus, Task[]>)
  }, [tasks, sortBy])

  return (
    <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory lg:overflow-x-visible pb-4">
      {STATUSES.map(status => (
        <Column
          key={status.key}
          title={status.label}
          status={status.key}
          tasks={tasksByStatus[status.key]}
          onEdit={onEdit}
          onStatusChange={onStatusChange}
          onDrop={onDrop}
        />
      ))}
    </div>
  )
}

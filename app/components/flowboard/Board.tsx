'use client'
import React, { useMemo } from 'react'
import Column from './Column'
import { STATUSES } from './constants'
import type { Task, TaskStatus } from './types'

export default function Board({
  tasks,
  onEdit,
  onStatusChange,
  onDrop
}: {
  tasks: Task[]
  onEdit: (task: Task) => void
  onStatusChange: (taskId: string, status: TaskStatus) => void
  onDrop: (taskId: string, newStatus: TaskStatus) => void
}) {
  const tasksByStatus = useMemo(() => {
    return STATUSES.reduce((acc, status) => {
      acc[status.key] = tasks.filter(task => task.status === status.key)
      return acc
    }, {} as Record<TaskStatus, Task[]>)
  }, [tasks])

  return (
    <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory lg:overflow-x-visible">
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

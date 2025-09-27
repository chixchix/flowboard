import React from 'react'
import type { Task } from './types'

export default function ProgressChart({ tasks }: { tasks: Task[] }) {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.status === 'done').length
  const inProgressTasks = tasks.filter(t => t.status === 'inprogress').length
  const todoTasks = totalTasks - completedTasks - inProgressTasks

  if (totalTasks === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-slate-400">No tasks to track</p>
      </div>
    )
  }

  const completedPercentage = (completedTasks / totalTasks) * 100
  const inProgressPercentage = (inProgressTasks / totalTasks) * 100

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-slate-400">Progress</span>
        <span className="font-medium text-slate-200">{Math.round(completedPercentage)}%</span>
      </div>

      <div className="w-full bg-slate-700 rounded-full h-2">
        <div className="flex h-2 rounded-full overflow-hidden">
          <div className="bg-green-500 transition-all duration-300" style={{ width: `${completedPercentage}%` }} />
          <div className="bg-blue-500 transition-all duration-300" style={{ width: `${inProgressPercentage}%` }} />
        </div>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-slate-400">Done</span>
          </div>
          <span className="font-medium text-slate-200">{completedTasks}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-slate-400">In Progress</span>
          </div>
          <span className="font-medium text-slate-200">{inProgressTasks}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
            <span className="text-slate-400">To Do</span>
          </div>
          <span className="font-medium text-slate-200">{todoTasks}</span>
        </div>
      </div>
    </div>
  )
}

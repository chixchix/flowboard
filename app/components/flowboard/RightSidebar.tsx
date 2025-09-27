import React from 'react'
import ProgressChart from './ProgressChart'
import { cx } from './utils'
import type { Task } from './types'

export default function RightSidebar({
  tasks,
  isCollapsed,
  onToggle
}: {
  tasks: Task[]
  isCollapsed: boolean
  onToggle: () => void
}) {
  return (
    <div className={cx('bg-slate-800 border-l border-slate-700 transition-all duration-300', isCollapsed ? 'w-12' : 'w-80')}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          {!isCollapsed && <h2 className="text-sm font-medium text-slate-200">Overview</h2>}
          <button onClick={onToggle} className="p-1 hover:bg-slate-700 rounded-md transition-colors duration-200">
            <div className={cx('w-4 h-4 border-2 border-gray-400 transition-transform duration-200', isCollapsed ? 'rotate-180' : '')}>
              <div className="w-0 h-0 border-l-2 border-l-gray-400 border-t-2 border-t-transparent border-b-2 border-b-transparent ml-1"></div>
            </div>
          </button>
        </div>

        {!isCollapsed && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Progress</h3>
              <ProgressChart tasks={tasks} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

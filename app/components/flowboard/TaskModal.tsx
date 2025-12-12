'use client'

import React, { useEffect, useState } from 'react'
import Badge from './Badge'
import { CATEGORIES, STATUSES, PRIORITIES } from './constants'
import { getCategoryColor } from './utils'
import type { Task, TaskStatus, Category, Priority } from './types'
import Modal from './Modal'

type Props = {
  task: Task | null
  isOpen: boolean
  onClose: () => void
  onSave: (task: Task) => void
  onDelete: (taskId: string) => void
  onArchive?: (taskId: string) => void
  onUnarchive?: (taskId: string) => void
}

export default function TaskModal({
  task,
  isOpen,
  onClose,
  onSave,
  onDelete,
  onArchive,
  onUnarchive
}: Props) {
  const [editedTask, setEditedTask] = useState<Task | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (task) {
      setEditedTask({ ...task })
      setIsEditing(false)
    }
  }, [task])

  const handleSave = () => {
    if (!editedTask) return
    onSave(editedTask)
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (!task) return
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id)
      onClose()
    }
  }

  const handleArchive = () => {
    if (!task) return
    if (task.archived && onUnarchive) {
      onUnarchive(task.id)
    } else if (!task.archived && onArchive) {
      onArchive(task.id)
    }
    onClose()
  }

  // ──────────────────────────────────────────────────────────────────────────────
  // Branch 1: No task selected 
  // ──────────────────────────────────────────────────────────────────────────────
  if (!task) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Task Details"
        panelClassName="!bg-slate-900"
      >
        <div className="py-10 text-center text-slate-400">
          Select a task to view its details.
        </div>
      </Modal>
    )
  }

  // ──────────────────────────────────────────────────────────────────────────────
  // Branch 2: Task present but local state not hydrated yet
  // ──────────────────────────────────────────────────────────────────────────────
  if (task && !editedTask) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Task Details"
        panelClassName="!bg-slate-900"
      >
        <div className="space-y-3">
          <div className="h-5 w-40 rounded bg-slate-700/60 animate-pulse" />
          <div className="h-20 rounded bg-slate-700/40 animate-pulse" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-12 rounded bg-slate-700/40 animate-pulse" />
            <div className="h-12 rounded bg-slate-700/40 animate-pulse" />
          </div>
        </div>
      </Modal>
    )
  }

  // ──────────────────────────────────────────────────────────────────────────────
  // Branch 3: Ready — full content
  // ──────────────────────────────────────────────────────────────────────────────
  return (
    <Modal
      isOpen={Boolean(isOpen && task && editedTask)}
      onClose={onClose}
      title="Task Details"
      panelClassName="!bg-slate-900"
    >
      {/* Top actions */}
      <div className="flex items-center justify-end gap-2 mb-3">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1.5 text-sm rounded-md text-blue-300 hover:text-white hover:bg-blue-500/10 ring-1 ring-inset ring-blue-500/20 transition"
          >
            Edit
          </button>
        ) : (
          <>
            <button
              onClick={handleSave}
              className="px-3 py-1.5 text-sm rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition shadow"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 text-sm rounded-md text-slate-300 hover:text-white hover:bg-slate-700/40 ring-1 ring-inset ring-slate-600/40 transition"
            >
              Cancel
            </button>
          </>
        )}
        {(onArchive || onUnarchive) && (
          <button
            onClick={handleArchive}
            className="px-3 py-1.5 text-sm rounded-md text-slate-300 hover:text-white hover:bg-slate-700/40 ring-1 ring-inset ring-slate-600/40 transition"
          >
            {task.archived ? 'Unarchive' : 'Archive'}
          </button>
        )}
        <button
          onClick={handleDelete}
          className="px-3 py-1.5 text-sm rounded-md text-red-300 hover:text-white hover:bg-red-600/10 ring-1 ring-inset ring-red-500/20 transition"
        >
          Delete
        </button>
      </div>

      {/* Content sections */}
      <div className="space-y-6">
        {/* Title */}
        <section className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-4">
          <label className="block text-xs font-semibold tracking-wide text-slate-400 uppercase mb-1.5">
            Title
          </label>
          {isEditing ? (
            <input
              type="text"
              value={editedTask!.title}
              onChange={(e) => setEditedTask({ ...editedTask!, title: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 text-slate-100 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ) : (
            <p className="text-[15px] leading-6 text-slate-100">{task.title}</p>
          )}
        </section>

        {/* Notes */}
        <section className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-4">
          <label className="block text-xs font-semibold tracking-wide text-slate-400 uppercase mb-1.5">
            Notes
          </label>
          {isEditing ? (
            <textarea
              value={editedTask!.notes || ''}
              onChange={(e) => setEditedTask({ ...editedTask!, notes: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 text-slate-100 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
            />
          ) : (
            <p className="text-slate-300 leading-6">
              {task.notes || 'No notes'}
            </p>
          )}
        </section>

        {/* Meta */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Category */}
          <div className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-4">
            <label className="block text-xs font-semibold tracking-wide text-slate-400 uppercase mb-1.5">
              Category
            </label>
            {isEditing ? (
              <select
                value={editedTask!.category}
                onChange={(e) =>
                  setEditedTask({ ...editedTask!, category: e.target.value as Category })
                }
                className="w-full px-3 py-2 rounded-lg bg-slate-900 text-slate-100 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            ) : (
              <Badge className={getCategoryColor(task.category)}>{task.category}</Badge>
            )}
          </div>

          {/* Status */}
          <div className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-4">
            <label className="block text-xs font-semibold tracking-wide text-slate-400 uppercase mb-1.5">
              Status
            </label>
            {isEditing ? (
              <select
                value={editedTask!.status}
                onChange={(e) =>
                  setEditedTask({ ...editedTask!, status: e.target.value as TaskStatus })
                }
                className="w-full px-3 py-2 rounded-lg bg-slate-900 text-slate-100 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {STATUSES.map((status) => (
                  <option key={status.key} value={status.key}>
                    {status.label}
                  </option>
                ))}
              </select>
            ) : (
              <Badge className="bg-slate-800 text-slate-200 border-slate-600">
                {STATUSES.find((s) => s.key === task.status)?.label}
              </Badge>
            )}
          </div>

          {/* Priority */}
          <div className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-4">
            <label className="block text-xs font-semibold tracking-wide text-slate-400 uppercase mb-1.5">
              Priority
            </label>
            {isEditing ? (
              <select
                value={editedTask!.priority || 'medium'}
                onChange={(e) =>
                  setEditedTask({ ...editedTask!, priority: e.target.value as Priority })
                }
                className="w-full px-3 py-2 rounded-lg bg-slate-900 text-slate-100 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {PRIORITIES.map((priority) => (
                  <option key={priority.key} value={priority.key}>
                    {priority.label}
                  </option>
                ))}
              </select>
            ) : (
              <Badge className={PRIORITIES.find(p => p.key === task.priority)?.color || 'bg-slate-600 text-slate-200'}>
                {PRIORITIES.find(p => p.key === task.priority)?.label || 'None'}
              </Badge>
            )}
          </div>

          {/* Due Date */}
          <div className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-4">
            <label className="block text-xs font-semibold tracking-wide text-slate-400 uppercase mb-1.5">
              Due Date
            </label>
            {isEditing ? (
              <input
                type="date"
                value={editedTask!.dueDate ? editedTask!.dueDate.split('T')[0] : ''}
                onChange={(e) =>
                  setEditedTask({ ...editedTask!, dueDate: e.target.value ? new Date(e.target.value).toISOString() : undefined })
                }
                className="w-full px-3 py-2 rounded-lg bg-slate-900 text-slate-100 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-slate-300">
                {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'No due date'}
              </p>
            )}
          </div>
        </section>
      </div>
    </Modal>
  )
}

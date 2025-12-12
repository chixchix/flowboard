import type { Category, TaskStatus, Priority } from './types'

export const CATEGORIES: Category[] = ['Work', 'Personal', 'Ideas', 'Other']

export const STATUSES: { key: TaskStatus; label: string }[] = [
  { key: 'todo', label: 'To Do' },
  { key: 'next', label: 'Next' },
  { key: 'inprogress', label: 'In Progress' },
  { key: 'done', label: 'Done' }
]

export const PRIORITIES: { key: Priority; label: string; color: string }[] = [
  { key: 'low', label: 'Low', color: 'bg-slate-500 text-slate-100' },
  { key: 'medium', label: 'Medium', color: 'bg-blue-500 text-white' },
  { key: 'high', label: 'High', color: 'bg-orange-500 text-white' },
  { key: 'critical', label: 'Critical', color: 'bg-red-500 text-white' }
]

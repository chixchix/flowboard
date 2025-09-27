import type { Category, TaskStatus } from './types'

export const CATEGORIES: Category[] = ['Work', 'Personal', 'School', 'Other']

export const STATUSES: { key: TaskStatus; label: string }[] = [
  { key: 'todo', label: 'To Do' },
  { key: 'next', label: 'Next' },
  { key: 'inprogress', label: 'In Progress' },
  { key: 'done', label: 'Done' }
]

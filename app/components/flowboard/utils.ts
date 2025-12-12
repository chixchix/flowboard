import type { Category, Task, Priority } from './types'
import type { SortOption } from './FiltersBar'

export const cx = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(' ')

export const generateId = () => Math.random().toString(36).substr(2, 9)

export const getCategoryColor = (category: Category) => {
  const colors: Record<Category, string> = {
    Work: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    Personal: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    Ideas: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    Other: 'bg-slate-500/20 text-slate-300 border-slate-500/30'
  }
  return colors[category]
}

const priorityOrder: Record<Priority, number> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1
}

export const sortTasks = (tasks: Task[], sortBy: SortOption): Task[] => {
  return [...tasks].sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        const priorityA = priorityOrder[a.priority || 'medium']
        const priorityB = priorityOrder[b.priority || 'medium']
        return priorityB - priorityA // Higher priority first
      
      case 'dueDate':
        if (!a.dueDate && !b.dueDate) return 0
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      
      case 'title':
        return a.title.localeCompare(b.title)
      
      case 'createdAt':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() // Newest first
    }
  })
}

import type { Category } from './types'

export const cx = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(' ')

export const generateId = () => Math.random().toString(36).substr(2, 9)

export const getCategoryColor = (category: Category) => {
  const colors = {
    Work: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    Personal: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    School: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    Other: 'bg-slate-500/20 text-slate-300 border-slate-500/30'
  }
  return colors[category]
}

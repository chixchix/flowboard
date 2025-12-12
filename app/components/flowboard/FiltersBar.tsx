import React from 'react'
import { CATEGORIES, STATUSES } from './constants'
import { ArrowUpDown } from 'lucide-react'
import type { Category, TaskStatus } from './types'

export type SortOption = 'createdAt' | 'priority' | 'dueDate' | 'title'

export default function FiltersBar({
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy
}: {
  searchQuery: string
  setSearchQuery: (query: string) => void
  categoryFilter: Category | 'All'
  setCategoryFilter: (category: Category | 'All') => void
  statusFilter: TaskStatus | 'All'
  setStatusFilter: (status: TaskStatus | 'All') => void
  sortBy: SortOption
  setSortBy: (sort: SortOption) => void
}) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1 min-w-60 px-3 py-2 border border-slate-600 bg-slate-700 text-white placeholder-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      />

      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value as Category | 'All')}
        className="px-3 py-2 border border-slate-600 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      >
        <option value="All">All Categories</option>
        {CATEGORIES.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value as TaskStatus | 'All')}
        className="px-3 py-2 border border-slate-600 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      >
        <option value="All">All Status</option>
        {STATUSES.map(status => (
          <option key={status.key} value={status.key}>{status.label}</option>
        ))}
      </select>

      <div className="flex items-center gap-2 px-3 py-2 border border-slate-600 bg-slate-700 text-white rounded-lg">
        <ArrowUpDown className="w-4 h-4 text-slate-400" />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="bg-transparent focus:outline-none"
        >
          <option value="createdAt">Date Created</option>
          <option value="priority">Priority</option>
          <option value="dueDate">Due Date</option>
          <option value="title">Title (A-Z)</option>
        </select>
      </div>
    </div>
  )
}

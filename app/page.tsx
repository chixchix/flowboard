'use client'

import React, { useState, useCallback, useMemo, useEffect } from 'react'

import Header from './components/flowboard/Header'
import QuickAddForm from './components/flowboard/QuickAddForm'
import FiltersBar, { type SortOption } from './components/flowboard/FiltersBar'
import Board from './components/flowboard/Board'
import RightSidebar from './components/flowboard/RightSidebar'
import TaskModal from './components/flowboard/TaskModal'
import KeyboardShortcutsModal from './components/flowboard/KeyboardShortcutsModal'
import ClockSweepLoader from './components/Loading'

import { useLocalStorageState, useDebouncedValue } from './components/flowboard/hooks'
import { generateId } from './components/flowboard/utils'
import type { Task, TaskStatus, Category } from './components/flowboard/types'

const seedTasks: Task[] = [
  { id: '1', title: 'Design system review', notes: 'Review palette & typography.', category: 'Work', status: 'todo', priority: 'high', createdAt: new Date().toISOString(), dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString() },
  { id: '2', title: 'Weekly team sync', notes: 'Prep agenda: progress + blockers.', category: 'Work', status: 'next', priority: 'medium', createdAt: new Date().toISOString() },
  { id: '3', title: 'Fix authentication bug', notes: 'Mobile login issue.', category: 'Work', status: 'inprogress', priority: 'critical', createdAt: new Date().toISOString(), dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString() },
  { id: '4', title: 'Grocery shopping', category: 'Personal', status: 'done', priority: 'low', createdAt: new Date().toISOString() },
  { id: '5', title: 'Learn TypeScript generics', notes: 'Deep dive into advanced TypeScript patterns', category: 'Ideas', status: 'todo', priority: 'medium', createdAt: new Date().toISOString() }
]

export default function FlowBoardApp() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 5000)
    return () => clearTimeout(t)
  }, [])

  const [tasks, setTasks] = useLocalStorageState<Task[]>('flowboard-tasks', seedTasks)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [showArchived, setShowArchived] = useState(false)
  const [showShortcuts, setShowShortcuts] = useState(false)

  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<Category | 'All'>('All')
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'All'>('All')
  const [sortBy, setSortBy] = useState<SortOption>('createdAt')

  const debouncedSearchQuery = useDebouncedValue(searchQuery, 300)

  const activeTasks = useMemo(() => tasks.filter(t => !t.archived), [tasks])
  const archivedTasks = useMemo(() => tasks.filter(t => t.archived), [tasks])
  const displayTasks = showArchived ? archivedTasks : activeTasks

  const filteredTasks = useMemo(() => {
    const q = debouncedSearchQuery.toLowerCase()
    return displayTasks.filter(task => {
      const matchesSearch =
        !q ||
        task.title.toLowerCase().includes(q) ||
        (task.notes && task.notes.toLowerCase().includes(q))
      const matchesCategory = categoryFilter === 'All' || task.category === categoryFilter
      const matchesStatus = statusFilter === 'All' || task.status === statusFilter
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [displayTasks, debouncedSearchQuery, categoryFilter, statusFilter])

  const addTask = useCallback((taskData: Omit<Task, 'id'>) => {
    setTasks(prev => [...prev, { ...taskData, id: generateId() }])
  }, [setTasks])

  const updateTask = useCallback((updatedTask: Task) => {
    setTasks(prev => prev.map(t => (t.id === updatedTask.id ? { ...updatedTask } : t)))
  }, [setTasks])

  const deleteTask = useCallback((taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId))
  }, [setTasks])

  const archiveTask = useCallback((taskId: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, archived: true } : t))
  }, [setTasks])

  const unarchiveTask = useCallback((taskId: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, archived: false } : t))
  }, [setTasks])

  const handleImport = useCallback((importedTasks: Task[]) => {
    if (window.confirm('This will replace all current tasks. Continue?')) {
      setTasks(importedTasks)
    }
  }, [setTasks])

  const changeTaskStatus = useCallback((taskId: string, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(t => (t.id === taskId ? { ...t, status: newStatus } : t)))
  }, [setTasks])

  const handleTaskEdit = useCallback((task: Task) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }, [])

  const handleModalClose = useCallback(() => setIsModalOpen(false), [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape to close modal
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false)
      }
      
      // ? to toggle shortcuts help
      if (e.key === '?' && !isModalOpen) {
        e.preventDefault()
        setShowShortcuts(!showShortcuts)
      }
      
      // Cmd/Ctrl + K to focus search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        document.querySelector<HTMLInputElement>('input[placeholder="Search tasks..."]')?.focus()
      }
      
      // Cmd/Ctrl + N to focus quick add
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
        e.preventDefault()
        document.querySelector<HTMLInputElement>('input[placeholder="Add a task..."]')?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, showShortcuts])

  if (loading) return <ClockSweepLoader />

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Header 
        tasks={tasks} 
        onImport={handleImport}
        onToggleArchived={() => setShowArchived(!showArchived)}
      />
      <div className="flex-1 flex">
        <main className="flex-1 p-6 overflow-hidden">
          <div className="max-w-7xl mx-auto space-y-6">
            {showArchived ? (
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">Archived Tasks</h2>
                  <button
                    onClick={() => setShowArchived(false)}
                    className="px-3 py-1.5 text-sm text-slate-300 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
                  >
                    Back to Active
                  </button>
                </div>
              </div>
            ) : (
              <QuickAddForm onAdd={addTask} />
            )}
            <FiltersBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
            <Board
              tasks={filteredTasks}
              onEdit={handleTaskEdit}
              onStatusChange={changeTaskStatus}
              onDrop={changeTaskStatus}
              sortBy={sortBy}
            />
          </div>
        </main>
        <div className="hidden lg:block">
          <RightSidebar
            tasks={activeTasks}
            isCollapsed={isSidebarCollapsed}
            onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
        </div>
      </div>
      <footer className="bg-slate-900 border-t border-slate-700 px-6 py-3">
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-400">
            FlowBoard - A Linear-inspired task management tool
          </p>
          <button
            onClick={() => setShowShortcuts(true)}
            className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            Keyboard Shortcuts <kbd className="ml-1 px-1.5 py-0.5 bg-slate-700 border border-slate-600 rounded">?</kbd>
          </button>
        </div>
      </footer>
      <TaskModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={updateTask}
        onDelete={deleteTask}
        onArchive={archiveTask}
        onUnarchive={unarchiveTask}
      />
      <KeyboardShortcutsModal 
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />
    </div>
  )
}

'use client'

import React, { useState, useCallback, useMemo, useEffect } from 'react'

import Header from './components/flowboard/Header'
import QuickAddForm from './components/flowboard/QuickAddForm'
import FiltersBar from './components/flowboard/FiltersBar'
import Board from './components/flowboard/Board'
import RightSidebar from './components/flowboard/RightSidebar'
import TaskModal from './components/flowboard/TaskModal'
import ClockSweepLoader from './components/Loading'

import { useLocalStorageState, useDebouncedValue } from './components/flowboard/hooks'
import { generateId } from './components/flowboard/utils'
import type { Task, TaskStatus, Category } from './components/flowboard/types'

const seedTasks: Task[] = [
  { id: '1', title: 'Design system review', notes: 'Review palette & typography.', category: 'Work', status: 'todo' },
  { id: '2', title: 'Weekly team sync', notes: 'Prep agenda: progress + blockers.', category: 'Work', status: 'next' },
  { id: '3', title: 'Fix authentication bug', notes: 'Mobile login issue.', category: 'Work', status: 'inprogress' },
  { id: '4', title: 'Grocery shopping', category: 'Personal', status: 'done' }
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

  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<Category | 'All'>('All')
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'All'>('All')

  const debouncedSearchQuery = useDebouncedValue(searchQuery, 300)

  const filteredTasks = useMemo(() => {
    const q = debouncedSearchQuery.toLowerCase()
    return tasks.filter(task => {
      const matchesSearch =
        !q ||
        task.title.toLowerCase().includes(q) ||
        (task.notes && task.notes.toLowerCase().includes(q))
      const matchesCategory = categoryFilter === 'All' || task.category === categoryFilter
      const matchesStatus = statusFilter === 'All' || task.status === statusFilter
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [tasks, debouncedSearchQuery, categoryFilter, statusFilter])

  const addTask = useCallback((taskData: Omit<Task, 'id'>) => {
    setTasks(prev => [...prev, { ...taskData, id: generateId() }])
  }, [setTasks])

  const updateTask = useCallback((updatedTask: Task) => {
    setTasks(prev => prev.map(t => (t.id === updatedTask.id ? { ...updatedTask } : t)))
  }, [setTasks])

  const deleteTask = useCallback((taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId))
  }, [setTasks])

  const changeTaskStatus = useCallback((taskId: string, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(t => (t.id === taskId ? { ...t, status: newStatus } : t)))
  }, [setTasks])

  const handleTaskEdit = useCallback((task: Task) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }, [])

  const handleModalClose = useCallback(() => setIsModalOpen(false), [])

  if (loading) return <ClockSweepLoader />

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <main className="flex-1 p-6 overflow-hidden">
          <div className="max-w-7xl mx-auto space-y-6">
            <QuickAddForm onAdd={addTask} />
            <FiltersBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
            <Board
              tasks={filteredTasks}
              onEdit={handleTaskEdit}
              onStatusChange={changeTaskStatus}
              onDrop={changeTaskStatus}
            />
          </div>
        </main>
        <div className="hidden lg:block">
          <RightSidebar
            tasks={tasks}
            isCollapsed={isSidebarCollapsed}
            onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
        </div>
      </div>
      <footer className="bg-slate-900 border-t border-slate-700 px-6 py-3">
        <p className="text-xs text-slate-400 text-center">
          FlowBoard - A Linear-inspired task management tool
        </p>
      </footer>
      <TaskModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={updateTask}
        onDelete={deleteTask}
      />
    </div>
  )
}

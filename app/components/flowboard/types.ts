export type Task = {
    id: string
    title: string
    notes?: string
    category: 'Work' | 'Personal' | 'Ideas' | 'Other'
    status: 'todo' | 'next' | 'inprogress' | 'done'
    priority?: 'low' | 'medium' | 'high' | 'critical'
    dueDate?: string
    createdAt: string
    archived?: boolean
  }
  
  export type TaskStatus = 'todo' | 'next' | 'inprogress' | 'done'
  export type Category = 'Work' | 'Personal' | 'Ideas' | 'Other'
  export type Priority = 'low' | 'medium' | 'high' | 'critical'
  
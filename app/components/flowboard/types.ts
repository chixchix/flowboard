export type Task = {
    id: string
    title: string
    notes?: string
    category: 'Work' | 'Personal' | 'School' | 'Other'
    status: 'todo' | 'next' | 'inprogress' | 'done'
  }
  
  export type TaskStatus = 'todo' | 'next' | 'inprogress' | 'done'
  export type Category = 'Work' | 'Personal' | 'School' | 'Other'
  
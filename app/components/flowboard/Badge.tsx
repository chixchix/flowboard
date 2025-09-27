import React from 'react'
import { cx } from './utils'

export default function Badge({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cx('inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border', className)}>
      {children}
    </span>
  )
}

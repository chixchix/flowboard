'use client'
import { useCallback, useEffect, useState } from 'react'

export const useLocalStorageState = <T,>(key: string, defaultValue: T) => {
  const [state, setState] = useState<T>(defaultValue)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(key)
      if (saved) setState(JSON.parse(saved))
    } catch (error) {
      console.error('Error loading from localStorage:', error)
    }
  }, [key])

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setState(prev => {
      const newValue = typeof value === 'function' ? (value as (prev: T) => T)(prev) : value
      try {
        localStorage.setItem(key, JSON.stringify(newValue))
      } catch (error) {
        console.error('Error saving to localStorage:', error)
      }
      return newValue
    })
  }, [key])

  return [state, setValue] as const
}

export const useDebouncedValue = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

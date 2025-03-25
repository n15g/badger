import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export function useSessionStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const storedValue = sessionStorage.getItem(key)
    return storedValue !== null ? JSON.parse(storedValue) as T : initialValue
  })

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

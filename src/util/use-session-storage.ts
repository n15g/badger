import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { BADGER_STORAGE_KEY } from '../global.ts'

export function useSessionStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const storedValue = sessionStorage.getItem(`${BADGER_STORAGE_KEY}::${key}`)
    return storedValue !== null ? JSON.parse(storedValue) as T : initialValue
  })

  useEffect(() => {
    sessionStorage.setItem(`${BADGER_STORAGE_KEY}::${key}`, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

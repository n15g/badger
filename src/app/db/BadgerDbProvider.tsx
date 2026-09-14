import { createContext, FC, ReactNode, use, useEffect, useState } from 'react'
import { BadgerDb, getBadgerDb } from './badger-db.ts'
import LoadingScreen from '../util/LoadingScreen.tsx'


const IndexedDbContext = createContext<BadgerDb | undefined>(undefined)

// Supplied connections belong to the caller; the provider does not close them.
const BadgerDbProvider: FC<{ children: ReactNode, db?: BadgerDb }> & { useBadgerDb: () => BadgerDb } =
  ({ children, db }) => {
    const [badgerDb, setBadgerDb] = useState<BadgerDb | undefined>()

    useEffect(() => {
      if (db) return
      let cancelled = false

      void getBadgerDb().then((db) => {
        if (!cancelled) {
          setBadgerDb(db)
        }
      })

      return () => {
        cancelled = true
      }
    }, [db])

    const value = db ?? badgerDb
    if (value) {
      return (
        <IndexedDbContext value={value}>
          {children}
        </IndexedDbContext>
      )
    } else {
      return <LoadingScreen text={'Initializing IndexedDB...'}/>
    }
  }

BadgerDbProvider.useBadgerDb = (): BadgerDb => {
  const context = use(IndexedDbContext)
  if (!context) {
    throw new Error('useBadgerDb must be used within a BadgerDbProvider')
  }
  return context
}

export default BadgerDbProvider

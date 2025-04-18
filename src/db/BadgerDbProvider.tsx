import { createContext, FC, ReactNode, use, useEffect, useState } from 'react'
import { BadgerDb, getBadgerDb } from './badger-db.ts'
import { reticulateSplines } from '../util/reticulate-splines.ts'
import LoadingScreen from '../util/LoadingScreen.tsx'
import ErrorScreen from '../util/ErrorScreen.tsx'


const IndexedDbContext = createContext<BadgerDb | undefined>(undefined)

const BadgerDbProvider: FC<{ children: ReactNode }> & { useBadgerDb: () => BadgerDb } =
  ({ children }) => {
    const [badgerDb, setBadgerDb] = useState<BadgerDb | undefined>()
    const [error, setError] = useState<unknown>()
    const [loadingStr, setLoadingStr] = useState<string>(reticulateSplines)

    useEffect(() => {
      const loadDb = async () => {
        if (!badgerDb) {
          try {
            setLoadingStr('Initializing Badger IndexedDB...')
            const db = await getBadgerDb()
            setBadgerDb(db)
            return db
          } catch (err) {
            console.error(err)
            setError(err)
          }
        }
      }

      void loadDb()

      return () => {
        // Close DB on effect cleanup
        badgerDb?.close()
      }
    }, [badgerDb])

    if (badgerDb) {
      return (
        <IndexedDbContext value={badgerDb}>
          {children}
        </IndexedDbContext>
      )
    } else if (error) {
      return <ErrorScreen error={error}/>
    } else {
      return <LoadingScreen text={loadingStr}/>
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


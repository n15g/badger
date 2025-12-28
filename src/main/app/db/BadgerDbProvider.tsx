import { createContext, FC, ReactNode, use, useEffect, useState } from 'react'
import { BadgerDb, getBadgerDb } from './badger-db.ts'
import LoadingScreen from '../util/LoadingScreen.tsx'


const IndexedDbContext = createContext<BadgerDb | undefined>(undefined)

const BadgerDbProvider: FC<{ children: ReactNode }> & { useBadgerDb: () => BadgerDb } =
  ({ children }) => {
    const [badgerDb, setBadgerDb] = useState<BadgerDb | undefined>()

    useEffect(() => {
      const loadDb = async () => {
        if (!badgerDb) {
          setBadgerDb(await getBadgerDb())
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


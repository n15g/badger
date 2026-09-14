import { createContext, FC, ReactNode, use, useCallback, useEffect, useMemo, useState } from 'react'
import { BundleData, CohContentDatabase } from 'coh-content-db'
import BadgerDbProvider from '../db/BadgerDbProvider.tsx'
import { reticulateSplines } from '../util/reticulate-splines.ts'
import LoadingScreen from '../util/LoadingScreen.tsx'
import axios from 'axios'
import ErrorProvider from '../util/ErrorProvider.tsx'
import { DEFAULT_BUNDLE_SOURCE } from '../global.ts'
import ContentProvider from './ContentProvider.tsx'

const BUNDLE_SOURCE_KEY = 'bundle-source'
const BUNDLE_CACHE_KEY = 'cached-bundle'

type BundleSource = string | BundleData

interface ContentLoaderState {
  bundleSource: string
  loadBundle: (source?: BundleSource) => Promise<void>
}

const ContentContext = createContext<ContentLoaderState | undefined>(undefined)

const ContentLoader: FC<{ children: ReactNode }> & { useContentLoader: () => ContentLoaderState } =
  ({ children }) => {
    const badgerDb = BadgerDbProvider.useBadgerDb()
    const error = ErrorProvider.useError()

    const [bundleSource, setBundleSource] = useState<string | undefined>()
    const [content, setContent] = useState<CohContentDatabase | undefined>()

    const loadBundle = useCallback(async (newSource: BundleSource) => {
      if (typeof newSource === 'string') {
        const response = await axios.get(newSource)
        const newBundle = await response.data as BundleData
        await badgerDb.putKv(BUNDLE_SOURCE_KEY, newSource)
        setBundleSource(newSource)
        setContent(new CohContentDatabase(newBundle))
      } else {
        await badgerDb.putKv(BUNDLE_SOURCE_KEY, 'idb')
        setBundleSource('idb')
        await badgerDb.putKv(BUNDLE_CACHE_KEY, newSource)
        setContent(new CohContentDatabase(newSource))
      }
    }, [badgerDb])

    const initialLoad = useCallback(async () => {
      try {
        const savedSource = await badgerDb.getKv<string>(BUNDLE_SOURCE_KEY)

        if (savedSource === 'idb') {
          const savedBundle = await badgerDb.getKv<BundleData>(BUNDLE_CACHE_KEY)
          if (!savedBundle) {
            error('No bundle found, reverting to default bundle')
            await loadBundle(DEFAULT_BUNDLE_SOURCE)
            return
          }
          await loadBundle(savedBundle)
        } else {
          await loadBundle(DEFAULT_BUNDLE_SOURCE)
        }
      } catch (err) {
        error(err)
        await loadBundle(DEFAULT_BUNDLE_SOURCE)
      }
    }, [badgerDb, error, loadBundle])

    useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      void initialLoad()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const value = useMemo(() => {
      return { content, bundleSource, loadBundle }
    }, [content, bundleSource, loadBundle])

    if (content && bundleSource) {
      return (
        <ContentContext value={value as never}>
          <ContentProvider content={content}>
            {children}
          </ContentProvider>
        </ContentContext>
      )
    } else {
      return <LoadingScreen text={reticulateSplines()}/>
    }
  }

ContentLoader.useContentLoader = (): ContentLoaderState => {
  const context = use(ContentContext)
  if (!context) {
    throw new Error('useContentLoader must be used within a ContentLoaderProvider')
  }
  return context
}

export default ContentLoader

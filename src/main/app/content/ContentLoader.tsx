import { createContext, FC, ReactNode, use, useCallback, useEffect, useMemo, useState } from 'react'
import { BundleData, CohContentDatabase } from 'coh-content-db'
import BadgerDbProvider from '../db/BadgerDbProvider.tsx'
import { reticulateSplines } from '../util/reticulate-splines.ts'
import ErrorScreen from '../util/ErrorScreen.tsx'
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

    const [fatalError, setFatalError] = useState<unknown>()
    const [loadingStr, setLoadingStr] = useState<string>(reticulateSplines)
    const [bundleSource, setBundleSource] = useState<string | undefined>()
    const [content, setContent] = useState<CohContentDatabase | undefined>()

    const loadBundle = useCallback(async (newSource?: BundleSource) => {
      const loadHrefBundle = async (href: string) => {
        try {
          const response = await axios.get(href)
          const bundle = await response.data as BundleData
          setContent(new CohContentDatabase(bundle))
          setBundleSource(href)
        } catch (err) {
          setFatalError(err)
        }
      }

      const loadIdbBundle = async () => {
        const savedBundle = await badgerDb.getKv<BundleData>(BUNDLE_CACHE_KEY)
        if (!savedBundle) {
          throw new Error(`No bundle found in IDB.`)
        }
        setContent(new CohContentDatabase(savedBundle))
        setBundleSource('idb')
      }

      if (!newSource) {
        const savedSource = await badgerDb.getKv<string>(BUNDLE_SOURCE_KEY)
        if (savedSource === 'idb') {
          try {
            await loadIdbBundle()
            setBundleSource('idb')
          } catch (err) {
            console.error('Error while loading bundle from IDB', err)
            error('Error while loading cached bundle, reverting to default bundle.')
            await loadHrefBundle(DEFAULT_BUNDLE_SOURCE)
          }
        } else {
          await loadHrefBundle(savedSource ?? DEFAULT_BUNDLE_SOURCE)
        }
      } else if (typeof newSource === 'string') {
        await loadHrefBundle(newSource)
      } else {
        setContent(new CohContentDatabase(newSource))
        await badgerDb.putKv(BUNDLE_CACHE_KEY, newSource)
        setBundleSource('idb')
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
      try {
        setLoadingStr('Loading content bundle...')
        void loadBundle()
      } catch (err) {
        setFatalError(err)
      }
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
    } else if (fatalError) {
      return <ErrorScreen error={fatalError}/>
    } else {
      return <LoadingScreen text={loadingStr}/>
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

import { createContext, FC, ReactNode, use } from 'react'
import { CohContentDatabase } from 'coh-content-db'

const ContentContext = createContext<CohContentDatabase | undefined>(undefined)

const ContentProvider: FC<{ children: ReactNode, content: CohContentDatabase }> & { useContent: () => CohContentDatabase } =
  ({ children, content }) => {
    return (
      <ContentContext value={content}>
        {children}
      </ContentContext>
    )
  }

ContentProvider.useContent = (): CohContentDatabase => {
  const context = use(ContentContext)
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider')
  }
  return context
}

export default ContentProvider

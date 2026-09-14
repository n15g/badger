import ContentProvider from '../content/ContentProvider.tsx'
import { useParams } from 'react-router'
import Page404 from '../Page404.tsx'
import { FC, ReactNode } from 'react'
import { Badge } from 'coh-content-db'

const BadgeLoader: FC<{ children: (badge: Badge) => ReactNode }> = ({ children }) => {
  const content = ContentProvider.useContent()
  const params = useParams()

  const badge = content.getBadge(params.badgeKey)

  return !badge ? <Page404/> : <>{children(badge)}</>
}

export default BadgeLoader

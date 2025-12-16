import ContentProvider from '../content/ContentProvider.tsx'
import { useParams } from 'react-router'
import BadgeView from './BadgeView.tsx'
import Page404 from '../Page404.tsx'

function BadgeViewLoader() {
  const content = ContentProvider.useContent()
  const params = useParams()

  const badge = content.getBadge(params.badgeKey)

  return badge ? <BadgeView badge={badge}/> : <Page404/>
}

export default BadgeViewLoader

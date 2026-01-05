import { FC } from 'react'
import MainSection from '../util/MainSection.tsx'
import BadgeCard from './BadgeCard.tsx'
import ContentProvider from '../content/ContentProvider.tsx'
import { useParams } from 'react-router'
import Page404 from '../Page404.tsx'

const BadgeViewPage: FC = () => {
  const content = ContentProvider.useContent()
  const params = useParams()

  const badge = content.getBadge(params.badgeKey)

  return !badge ? <Page404/> : (
    <MainSection title={badge.name.toString(' / ')}>
      <BadgeCard badge={badge}/>
    </MainSection>
  )
}

export default BadgeViewPage

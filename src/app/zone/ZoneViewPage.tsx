import { FC } from 'react'
import { useParams } from 'react-router'
import MainSection from '../util/MainSection.tsx'
import ContentProvider from '../content/ContentProvider.tsx'
import Page404 from '../Page404.tsx'
import ZoneCard from './ZoneCard.tsx'

const ZoneViewPage: FC = () => {
  const content = ContentProvider.useContent()
  const params = useParams()

  const zone = content.getZone(params.zoneKey)

  return !zone ? <Page404/> : (
    <MainSection title={zone.name}>
      <ZoneCard zone={zone}/>
    </MainSection>
  )
}

export default ZoneViewPage

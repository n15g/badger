import { FC } from 'react'
import { useParams } from 'react-router'
import MainSection from '../util/MainSection.tsx'
import ContentProvider from '../content/ContentProvider.tsx'
import Page404 from '../Page404.tsx'
import MissionCard from './MissionCard.tsx'

const MissionViewPage: FC = () => {
  const content = ContentProvider.useContent()
  const params = useParams()

  const mission = content.getMission(params.missionKey)

  return !mission ? <Page404/> : (
    <MainSection title={mission.name}>
      <MissionCard mission={mission}/>
    </MainSection>
  )
}

export default MissionViewPage

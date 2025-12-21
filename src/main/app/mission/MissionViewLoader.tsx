import ContentProvider from '../content/ContentProvider.tsx'
import { useParams } from 'react-router'
import MissionView from './MissionView.tsx'
import Page404 from '../Page404.tsx'

function MissionViewLoader() {
  const content = ContentProvider.useContent()
  const params = useParams()

  const mission = content.getMission(params.missionKey)

  return mission ? <MissionView mission={mission}/> : <Page404/>
}

export default MissionViewLoader

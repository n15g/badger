import ContentProvider from '../content/ContentProvider.tsx'
import { useParams } from 'react-router'
import Page404 from '../Page404.tsx'
import ZoneView from './ZoneView.tsx'

function ZoneViewLoader() {
  const content = ContentProvider.useContent()
  const params = useParams()

  const zone = content.getZone(params.zoneKey)

  return zone ? <ZoneView zone={zone}/> : <Page404/>
}

export default ZoneViewLoader

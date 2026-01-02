import { Route, Routes } from 'react-router'
import AboutPage from './AboutPage.tsx'
import BadgeListPage from './badge/BadgeListPage.tsx'
import ZoneListPage from './zone/ZoneListPage.tsx'
import ContactList from './contact/ContactList.tsx'
import MissionListPage from './mission/MissionListPage.tsx'
import CharacterListPageLoader from './character/CharacterListPageLoader.tsx'
import BadgeGallery from './badge/BadgeGallery.tsx'
import BadgeGalleryPage from './badge/BadgeGalleryPage.tsx'
import BadgeList from './badge/BadgeList.tsx'
import BadgeCard from './badge/BadgeCard.tsx'
import ContactViewPage from './contact/ContactViewPage.tsx'
import MissionViewPage from './mission/MissionViewPage.tsx'
import ZoneViewPage from './zone/ZoneViewPage.tsx'
import BadgeViewPage from './badge/BadgeViewPage.tsx'
import BadgeLoader from './badge/BadgeLoader.tsx'
import CharacterLoader from './character/CharacterLoader.tsx'
import CharacterViewPage from './character/CharacterViewPage.tsx'

function BadgerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AboutPage/>}/>

      <Route path="/badges" element={<BadgeListPage/>}/>
      <Route path="/badges/:badgeKey" element={<BadgeViewPage/>}/>

      <Route path="/badge-gallery" element={<BadgeGalleryPage/>}/>

      <Route path="/characters" element={<CharacterListPageLoader/>}/>
      <Route path="/characters/:characterKey" element={
        <CharacterLoader>{(character) => <CharacterViewPage character={character}/>}</CharacterLoader>
      }>
        <Route path="" element={<BadgeList/>}/>
        <Route path="badges" element={<BadgeList/>}/>
        <Route path="badges/:badgeKey" element={<BadgeLoader>{(badge) => <BadgeCard badge={badge}/>}</BadgeLoader>}/>
        <Route path="gallery" element={<BadgeGallery/>}/>
      </Route>

      <Route path="/contacts" element={<ContactList/>}/>
      <Route path="/contacts/:contactKey" element={<ContactViewPage/>}/>

      <Route path="/missions" element={<MissionListPage/>}>/</Route>
      <Route path="/missions/:missionKey" element={<MissionViewPage/>}/>

      <Route path="/zones" element={<ZoneListPage/>}/>
      <Route path="/zones/:zoneKey" element={<ZoneViewPage/>}/>
    </Routes>
  )
}

export default BadgerRoutes

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
import { createBrowserRouter } from 'react-router'
import Index from './Index.tsx'

export const Routes = createBrowserRouter([
  {
    path: '/',
    element: <Index/>,
    children: [
      { index: true, element: <AboutPage/> },
      { path: '/badges', element: <BadgeListPage/> },
      { path: '/badges/:badgeKey', element: <BadgeViewPage/> },

      { path: '/badge-gallery', element: <BadgeGalleryPage/> },

      { path: '/characters', element: <CharacterListPageLoader/> },
      {
        path: '/characters/:characterKey',
        element: <CharacterLoader>{(character) => <CharacterViewPage character={character}/>}</CharacterLoader>,
        children: [
          { index: true, element: <BadgeList/> },
          { path: 'badges', element: <BadgeList/> },
          { path: 'badges/:badgeKey', element: <BadgeLoader>{(badge) => <BadgeCard badge={badge}/>}</BadgeLoader> },
          { path: 'gallery', element: <BadgeGallery/> },
        ]
      },

      { path: '/contacts', element: <ContactList/> },
      { path: '/contacts/:contactKey', element: <ContactViewPage/> },

      { path: '/missions', element: <MissionListPage/> },
      { path: '/missions/:missionKey', element: <MissionViewPage/> },

      { path: '/zones', element: <ZoneListPage/> },
      { path: '/zones/:zoneKey', element: <ZoneViewPage/> },
    ]
  },
])

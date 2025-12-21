import { Route, Routes } from 'react-router'
import About from './About.tsx'
import BadgeList from './badge/BadgeList.tsx'
import BadgeViewLoader from './badge/BadgeViewLoader.tsx'
import ZoneViewLoader from './zone/ZoneViewLoader.tsx'
import ZoneList from './zone/ZoneList.tsx'
import ContactList from './contact/ContactList.tsx'
import MissionList from './mission/MissionList.tsx'
import ContactViewLoader from './contact/ContactViewLoader.tsx'

function BadgerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<About/>}></Route>
      <Route path="/badges" element={<BadgeList/>}></Route>
      <Route path="/badges/:badgeKey" element={<BadgeViewLoader/>}></Route>

      <Route path="/contacts" element={<ContactList/>}></Route>
      <Route path="/contacts/:contactKey" element={<ContactViewLoader/>}></Route>

      <Route path="/missions" element={<MissionList/>}></Route>

      <Route path="/zones" element={<ZoneList/>}></Route>
      <Route path="/zones/:zoneKey" element={<ZoneViewLoader/>}></Route>
    </Routes>
  )
}

export default BadgerRoutes

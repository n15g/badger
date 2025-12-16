import { Alert, Box, Breadcrumbs, Card, CardOverflow, Divider, Stack, Typography } from '@mui/joy'
import BadgeIcon from './BadgeIcon.tsx'
import BadgerMarkdown from '../util/BadgerMarkdown.tsx'
import { Badge } from 'coh-content-db'
import { FC } from 'react'
import { Icons } from '../util/Icons.tsx'
import MoralityListIcons from '../alignment/MoralityListIcons.tsx'
import SmartLink from '../util/SmartLink.tsx'
import { NavLink } from 'react-router'
import MainSection from '../util/MainSection.tsx'
import { BadgeTypes } from './BadgeTypes.tsx'
import SectionTitle from '../util/SectionTitle.tsx'
import BadgeNameInline from './BadgeNameInline.tsx'
import ReleaseDate from '../util/ReleaseDate.tsx'
import SetTitleLabel from './SetTitleLabel.tsx'

const BadgeView: FC<{ badge: Badge }> = ({ badge }) => {
  const { name, type, badgeText, morality, links, acquisition, notes, effect, releaseDate, setTitleId } = badge

  return (
    <MainSection label={name.toString(' / ')}>
      <Card>
        <CardOverflow>
          <Breadcrumbs separator={<Icons.Breadcrumb/>}>
            <NavLink to="/badges" style={{ textDecoration: 'none' }}>
              <Typography level="title-sm" startDecorator={<Icons.Badge/>}>Badges</Typography>
            </NavLink>
            <Typography level="title-sm">{BadgeTypes.get(type)} Badge</Typography>
          </Breadcrumbs>
          <Divider inset="context"/>
        </CardOverflow>

        <Box>
          <SectionTitle><BadgeNameInline badge={badge}/></SectionTitle>
        </Box>

        <Stack
          sx={{
            flexDirection: { xs: 'column-reverse', sm: 'row' },
            gap: 2
          }}>

          {/* Detail Panel*/}
          <Stack gap={2}>
            <Box>
              {badgeText.canonical.map((alternate) => (
                <blockquote key={alternate.value} className={alternate.alignment}>
                  <Typography component="span" level="body-xs">
                    <BadgerMarkdown content={alternate.value}/>
                  </Typography>
                </blockquote>
              ))}
            </Box>

            <Alert startDecorator={<Icons.Acquisition size={32}/>} color="success">
              <div>
                <Typography level="body-md">Acquisition</Typography>

                TODO: Detailed acquisition

                {acquisition && <BadgerMarkdown content={acquisition}/>}
              </div>
            </Alert>

            <Alert startDecorator={<Icons.Notes size={32}/>}>
              <Stack>
                <Typography level="body-md">Notes</Typography>
                {notes ? <BadgerMarkdown content={notes}/> : <em>No notes</em>}
              </Stack>
            </Alert>
          </Stack>

          {/* Info Panel*/}
          <Card>
            <Stack gap={2} alignItems="center">

              <Typography startDecorator={<Icons.Badge/>}>{BadgeTypes.get(type)}</Typography>
              <BadgeIcon badge={badge}/>

              {effect && (
                <Typography level="body-xs" textAlign="center" variant="soft" sx={{ borderRadius: 8, px: 1, py: 1.5 }}>
                  {effect}
                </Typography>
              )}

              <MoralityListIcons moralityList={morality}/>

              {setTitleId && (
                <SetTitleLabel value={setTitleId}/>
              )}

              {links.length > 0 && (<>
                <Divider/>
                {links.map(link => (
                  <SmartLink key={link.href} href={link.href}>{link.title}</SmartLink>
                ))}
              </>)}

              <Divider/>
              <ReleaseDate value={releaseDate} format="long"/>

            </Stack>
          </Card>
        </Stack>
      </Card>
    </MainSection>
  )
}

export default BadgeView

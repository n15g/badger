import { FC, Fragment } from 'react'
import { Badge, BadgeRequirement } from 'coh-content-db'
import { Box, Input, List, ListItem, ListItemContent, ListItemDecorator, Typography } from '@mui/joy'
import BadgeLink from './BadgeLink.tsx'
import BadgerMarkdown from '../util/BadgerMarkdown.tsx'
import SmartLink from '../util/SmartLink.tsx'
import MissionLink from '../mission/MissionLink.tsx'
import LocationLink from '../location/LocationLink.tsx'
import EnhancementCategoryLabel from '../enhancement/EnhancementCategoryLabel.tsx'
import AsyncCheckbox from '../util/AsyncCheckbox.tsx'
import CharacterContextProvider from '../character/CharacterContextProvider.tsx'


const RequirementListItem: FC<{ badge: Badge, requirement: BadgeRequirement }> = ({ badge, requirement }) => {
  const { character, hasRequirement, getRequirementCount, updateRequirement } = CharacterContextProvider.useCharacterContext()

  const owned = hasRequirement(badge, requirement)
  const currentCount = getRequirementCount(badge, requirement)

  const {
    type,
    location,
    notes,
    links,
    badgeKey,
    missionKey,
    monumentText,
    inventionTypes,
    inventionLevel,
    count,
  } = requirement

  const inner = (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    }}>

      {type === 'badge' && (<span>
          Collect <BadgeLink value={badgeKey}/>.
      </span>)}

      {type === 'mission' && (<span>
          Complete <MissionLink value={missionKey}/>.
      </span>)}

      {(type === 'location' || type === 'monument') && location && (<>
        {location.length === 1 && location[0] && (<span>
          Visit <LocationLink location={location[0]}/>.
        </span>)}

        {location.length > 1 && (<span>
            <List>
          Visit one of:
              {location.map((entry) => (
                <ListItem key={`${entry.zoneKey}:${entry.coords?.join()}`}>
                  <LocationLink location={entry}/>
                </ListItem>
              ))}
              </List>
        </span>)}

        {monumentText && (
          <Typography level="body-xs">
            <blockquote>{monumentText}</blockquote>
          </Typography>
        )}
      </>)}

      {type === 'invention' && inventionTypes && (
        <span>
          Craft {count} level {inventionLevel}
          {' '}
          {inventionTypes.map((inventionType, $i) => (
            <Fragment key={inventionType}>
              <EnhancementCategoryLabel value={inventionType}/>
              {$i < inventionTypes.length - 2 && ', '}
              {$i === inventionTypes.length - 2 && ' or '}
            </Fragment>
          ))}
          {' '}
          enhancement{count !== 1 ? 's' : ''}.
        </span>
      )}

      {type === 'invention-plus-one' && (
        <span>
          Craft 1 additional enhancement of either level.
        </span>
      )}

      {notes && (<Typography component="span" level="body-xs"><BadgerMarkdown content={notes}/></Typography>)}

      {links.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {links.map((link) => (
            <Typography key={link.href} level="body-xs">
              <SmartLink key={link.href} href={link.href}>{link.title}</SmartLink>
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  )

  return (
    <ListItem sx={{ filter: owned ? 'brightness(0.4)' : undefined }}>
      {character && (
        <ListItemDecorator>
          {requirement.type !== 'invention' && (
            <AsyncCheckbox checked={owned} onFrobnicate={async (next) => {
              await updateRequirement(badge, requirement, { owned: next })
            }}/>
          )}
          {requirement.type === 'invention' && (
            <Input
              type="number"
              aria-valuemin={0}
              aria-valuemax={requirement.count}
              sx={{ width: '4em', mr: 2 }}
              value={currentCount}
              onChange={(e) => {
                void updateRequirement(badge, requirement, { count: Number(e.target.value) })
              }}/>
          )}
        </ListItemDecorator>
      )}
      <ListItemContent>
        {inner}
      </ListItemContent>
    </ListItem>
  )
}

export default RequirementListItem

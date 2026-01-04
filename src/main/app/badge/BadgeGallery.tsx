import { FC, Fragment, useState } from 'react'
import ContentProvider from '../content/ContentProvider.tsx'
import { Box, BoxProps, Card, CardOverflow, Divider, FormControl, FormLabel, Option, Select, Stack, Switch, Typography } from '@mui/joy'
import { Badge, BadgeType } from 'coh-content-db'
import { BadgeTypeLabels } from './BadgeTypeLabels.tsx'
import BadgeIconLink from './BadgeIconLink.tsx'
import CharacterContextProvider from '../character/CharacterContextProvider.tsx'
import BadgeIconButton from './BadgeIconButton.tsx'

const BadgeGallery: FC<BoxProps> = ({ ...props }) => {
  const content = ContentProvider.useContent()
  const { character } = CharacterContextProvider.useCharacterContext()

  const [showUncollected, setShowUncollected] = useState(true)
  const [selectedType, setSelectedType] = useState<BadgeType | null>('exploration')

  const groups = content
    .searchBadges({ sort: 'canonical.asc' })
    .items
    .reduce<Partial<Record<BadgeType, Badge[]>>>((result, badge) => {
      const current = result[badge.type]
      result[badge.type] = current ? [...current, badge] : [badge]
      return result
    }, {} as Record<BadgeType, Badge[]>)

  return (
    <Box {...props}>

      <Box display="flex" justifyContent="flex-start" gap={2} sx={{ mb: 2 }}>
        <FormControl orientation={'horizontal'}>
          <Select
            value={selectedType}
            onChange={(_, value) => {
              setSelectedType(value)
            }}>
            <Option value={null}>All</Option>
            {BadgeTypeLabels.entries.map((badgeType) => (
              <Option key={badgeType[0]} value={badgeType[0]}>{badgeType[1]}</Option>
            ))}
          </Select>
        </FormControl>

        {character && (
          <FormControl orientation="horizontal">
            <FormLabel>Show Uncollected</FormLabel>
            <Switch checked={showUncollected} onChange={(e) => {
              setShowUncollected(e.target.checked)
            }}/>
          </FormControl>
        )}
      </Box>


      {Object
        .keys(groups)
        .filter((key) => selectedType ? key === selectedType : true)
        .map((key) => (
          <Fragment key={key}>
            <Divider/>
            <GallerySection
              badges={groups[key as BadgeType] ?? []}
              title={BadgeTypeLabels.get(key as BadgeType) ?? ''}
              showUncollected={showUncollected}
            />
          </Fragment>
        ))}
    </Box>
  )
}

const GallerySection: FC<{ badges: Badge[], title: string, showUncollected: boolean }> = ({ badges, title, showUncollected }) => {
  const { character, hasBadge, collectBadge } = CharacterContextProvider.useCharacterContext()

  const owned = badges.filter((badge) => !character || hasBadge(badge.key))
  const displayed = showUncollected ? badges : owned

  return (
    <Card sx={{ minHeight: 80, mb: 2 }}>
      <CardOverflow>
        <Typography level="title-lg" sx={{ my: 2 }}>
          {title} ({character ? <>{owned.length} of {badges.length}</> : <>{badges.length}</>})
        </Typography>
      </CardOverflow>

      <Stack direction="row" flexWrap="wrap" justifyContent="center" sx={{ p: 1, gap: 2 }}>
        {displayed.map((badge) => (
          <Box key={badge.key}>
            {character
              ? <BadgeIconButton badge={badge} context={character} value={hasBadge(badge)} onFrobnicate={async (owned) => {
                await collectBadge(badge, owned)
              }}/>
              : <BadgeIconLink value={badge}/>
            }
          </Box>
        ))}
        {displayed.length < 1 && <em>None</em>}
      </Stack>
    </Card>
  )
}

export default BadgeGallery

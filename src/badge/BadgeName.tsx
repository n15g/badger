import { FC } from 'react'
import { AlternateData, Badge } from 'coh-content-db'
import { Box, Stack, Typography } from '@mui/joy'
import ContentService from '../ContentService.ts'
import { classNames } from '../util/class-names.ts'
import { PiGenderFemale, PiGenderMale } from 'react-icons/pi'


const BadgeName: FC<{ badge: string | Badge, defaultName?: boolean }> = ({ badge, defaultName }) => {
  let actualBadge: Badge | undefined

  try {
    actualBadge = typeof badge === 'string'
      ? ContentService.db.getBadge(badge)
      : badge
  } catch {
    const key = typeof badge === 'string' ? badge : badge.key
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography level="title-sm" color="neutral">{key}</Typography>
      </Box>
    )
  }

  return defaultName
    ? <StyledName name={actualBadge.name.default}/>
    : <Stack>
      {actualBadge.name.canonical.map(name =>
        <StyledName key={`${name.value}:${name.alignment ?? ''}:${name.sex ?? ''}`}
                    name={name}/>
      )}
    </Stack>
}

const StyledName: FC<{ name?: AlternateData<string> }> = ({ name }) => {
  return <Stack direction="row" alignItems="center" gap={1}>
    <Typography level="title-sm">
      {name?.sex === 'M' && <PiGenderMale size={16}/>}
      {name?.sex === 'F' && <PiGenderFemale size={16}/>}
    </Typography>
    <Typography level="title-sm" className={classNames({
      'badge-name': true,
      hero: name?.alignment === 'H',
      villain: name?.alignment === 'V',
      praetorian: name?.alignment === 'P',
    })} sx={{ overflow: 'hidden', textWrap: 'nowrap', textOverflow: 'ellipsis' }}>
      {name?.value ?? 'Unknown'}
    </Typography>
  </Stack>
}
export default BadgeName

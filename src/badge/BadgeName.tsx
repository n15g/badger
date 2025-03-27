import { FC } from 'react'
import { AlternateData, Badge } from 'coh-content-db'
import { Stack, Typography } from '@mui/joy'
import { PiGenderFemale, PiGenderMale } from 'react-icons/pi'
import AlignmentColored from '../util/AlignmentColored.tsx'


const BadgeName: FC<{ badge: Badge, defaultName?: boolean }> = ({ badge, defaultName }) => {
  return defaultName
    ? <StyledName name={badge.name.default}/>
    : <Stack>
      {badge.name.canonical.map(name =>
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
    <Typography level="title-sm" sx={{ overflow: 'hidden', textWrap: 'nowrap', textOverflow: 'ellipsis', fontWeight: 'bold' }}>
      <AlignmentColored alignment={name?.alignment}>{name?.value ?? 'Unknown'}</AlignmentColored>
    </Typography>
  </Stack>
}
export default BadgeName
